import { AuthenticationManager } from './internal/AuthenticationManager';
import { Constants } from './internal/Constants';
import { AzureMapsGeocoderServiceOptions } from './AzureMapsGeocoderServiceOptions';
import { Rectangle, Cartesian3 } from 'Cesium';

/** Geocode result object. */
interface GeocodeResult {
    /** The display name for a location. */
    displayName: string;

    /** The bounding box for a location. */
    destination: Rectangle | Cartesian3;
}

const azMapsSearchUrl = 'https://{azMapsDomain}/search/{searchService}/json?api-version=1.0&query={query}&language={language}&view={view}&typeahead={typeahead}';

/** A geocoding service powered by Azure Maps. */
export class AzureMapsGeocoderService {

    /************************
     * Private properties
     ***********************/

    private _authManager: AuthenticationManager;
    private _options: AzureMapsGeocoderServiceOptions = {};

    /************************
     * Constructor
     ***********************/

     /**
      * A geocoding service powered by Azure Maps.
      * @param options The options for the geocoding service.
      */
    constructor(options: AzureMapsGeocoderServiceOptions) {
        const self = this;

        const opt = Object.assign({
            language: 'en-US',
            view: 'Auto',
            searchService: 'FUZZY',
            preferRectangle: true,
            limit: 10
        }, options);

        self._options = opt;

        const au = opt.authOptions || {};

        if (!au.azMapsDomain) {
            au.azMapsDomain = Constants.SHORT_DOMAIN;
        }

        const am = AuthenticationManager.getInstance(au);
        self._authManager = am;

        if (!am.isInitialized()) {
            am.initialize()
        }
    }

    /**
     * Processes a search query.
     * @param query The query to geocode.
     * @param type Type of geocode search to perform. A regular SEARCH, or an AUTOCOMPLETE. When in auto complete mode, the service goes into predictive mode.
     */
    public geocode(query: string, type: 'SEARCH' | 'AUTOCOMPLETE'): Promise<Array<GeocodeResult>> {
        const self = this;

        return new Promise<Array<GeocodeResult>>((resolve, reject) => {
            const opt = self._options;

            var url = azMapsSearchUrl
                .replace('{searchService}', opt.searchService.replace(/_/gi, '/'))
                .replace('{query}', query)
                .replace('{language}', opt.language)
                .replace('{view}', opt.view)
                .replace('{typeahead}', (type === 'AUTOCOMPLETE').toString());

            if(opt.searchService !== 'ADDRESS_REVERSE'){
                url += '&limit=' + opt.limit;
            }

            self._authManager.getRequest(url).then(r => {
                r.json().then(response => {
                    const results: Array<GeocodeResult> = [];

                    if (response) {
                        const responses: any[] = response.results || response.addresses;

                        responses.forEach(r => {
                            var destination: Cartesian3 | Rectangle;

                            if (opt.preferRectangle && r.viewport) {
                                const vp = r.viewport;
                                destination = Rectangle.fromDegrees(vp.topLeftPoint.lon, vp.btmRightPoint.lat, vp.btmRightPoint.lon, vp.topLeftPoint.lat);
                            }

                            if (!destination) {
                                if (typeof r.position === 'string') {
                                    const split = r.position.split(',');
                                    destination = Cartesian3.fromDegrees(parseFloat(split[1]), parseFloat(split[0]));
                                } else {
                                    destination = Cartesian3.fromDegrees(r.position.lon, r.position.lat);
                                }
                            }

                            results.push({
                                displayName: (r.poi && r.poi.name) ? r.poi.name : r.address.freeformAddress,
                                destination: destination
                            });
                        });
                    }

                    resolve(results);
                });
            }, e => {
                reject(e);
            });
        });
    }
}