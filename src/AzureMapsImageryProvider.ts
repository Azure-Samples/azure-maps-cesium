import { Credit, UrlTemplateImageryProvider, ProviderViewModel, ImageryLayer, Rectangle } from 'Cesium';
import { AzureMapsImageryProviderOptions } from './AzureMapsImageryProviderOptions';
import { AuthenticationManager } from './internal/AuthenticationManager';
import { Constants } from './internal/Constants';

const _renderV2TileUrl = 'https://{azMapsDomain}/map/tile?api-version=2.0&tilesetId={tilesetId}&zoom={z}&x={x}&y={y}&tileSize={tileSize}&language={language}&view={view}';
const _trafficFlowTileUrl = 'https://{azMapsDomain}/traffic/flow/tile/png?api-version=1.0&style={style}&zoom={z}&x={x}&y={y}';
const _trafficIncidentTileUrl = 'https://{azMapsDomain}/traffic/incident/tile/png?api-version=1.0&style={style}&zoom={z}&x={x}&y={y}';

interface ImageryLayerOptions {
    rectangle?: Rectangle;
    alpha?: number | ImageryLayer.ValueFunc;
    brightness?: number | ImageryLayer.ValueFunc;
    contrast?: number | ImageryLayer.ValueFunc;
    hue?: number | ImageryLayer.ValueFunc;
    saturation?: number | ImageryLayer.ValueFunc;
    gamma?: number | ImageryLayer.ValueFunc;
    show?: boolean;
    maximumAnisotropy?: number;
    minimumTerrainLevel?: number;
    maximumTerrainLevel?: number
}

/**
 * An imagery provider that connects to the Azure Maps Render V2 service.
 */
export class AzureMapsImageryProvider extends UrlTemplateImageryProvider {

    /************************
     * Private properties
     ***********************/

    private _authManager: AuthenticationManager;
    private _baseUrl: string = _renderV2TileUrl;
    private _options: AzureMapsImageryProviderOptions = {};

    /************************
     * Constructor
     ***********************/

    /**
     * An imagery provider that connects to the Azure Maps Render V2 service.
     * @param options Azure Maps Tile layer options.
     */
    constructor(options: AzureMapsImageryProviderOptions) {
        super({
            url: _renderV2TileUrl,
            enablePickFeatures: false,
            tileWidth: 256,
            tileHeight: 256,
            maximumLevel: 22,
            hasAlphaChannel: false
        });

        const self = this;

        const opt = Object.assign({
            language: 'en-US',
            view: 'Auto',
            tilesetId: 'microsoft.base.road',
            trafficFlowThickness: 5
        }, options);

        self._options = opt;

        const au = opt.authOptions || {};

        if (!au.azMapsDomain) {
            au.azMapsDomain = Constants.SHORT_DOMAIN;
        }

        const am = AuthenticationManager.getInstance(au);
        self._authManager = am;

        if (!am.isInitialized()) {
            am.initialize().then(() => {
                self._setTilesetId(opt.tilesetId);
            });
        } else {
            self._setTilesetId(opt.tilesetId);
        }
    }

    /**
     * Gets an Azure Maps imagery provider as an ImageryLayer.
     * @param azMapsOptions Options for connecting to the Azure Maps platform.
     * @param layerOptions Options for the imagery layer.
     */
    public static getImageryLayer(azMapsOptions: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions): ImageryLayer {
        return new ImageryLayer(new AzureMapsImageryProvider(azMapsOptions), layerOptions);
    }

    /**
     * Gets an array of all overlay imagery layers that are not base map layers from Azure Maps.
     * @param azMapsOptions Options for connecting to the Azure Maps platform.
     * @param layerOptions Options for the imagery layer.
     */
    public static getAllOverlayImageryLayer(azMapsOptions?: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions): ImageryLayer[] {
        const pvm: ImageryLayer[] = [];
        const td = Constants.TILESETS;

        Object.keys(td).forEach(tilesetId => {
            const ts = td[tilesetId];
            if(ts && !ts.isBasemap) {
                pvm.push(AzureMapsImageryProvider.getImageryLayer(Object.assign({}, azMapsOptions, {
                    tilesetId: tilesetId
                }), layerOptions));
            }
        });

        return pvm;
    }

    /**
     * Gets a ProviderViewModel for an Azure Maps layer.
     * @param options Options for connecting to the Azure Maps platform.
     * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
     */
    public static getProviderViewModel(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean): ProviderViewModel {
        if (options) {
            options.tilesetId = options.tilesetId || 'microsoft.base.road';

            const info = Constants.TILESETS[options.tilesetId];

            if(info){
                const name = ((typeof prependAzureMaps === 'boolean' && prependAzureMaps)? 'Azure Maps ' : '') + info.name;

                return new ProviderViewModel({
                    name: name,
                    iconUrl: info.icon,
                    tooltip: name,
                    creationFunction: function () {
                        return new AzureMapsImageryProvider(options);
                    }
                });
            }
        }

        return null;
    }

    /**
     * Gets an array of ProviderViewModel for all Azure Maps layer.
     * @param options Options for connecting to the Azure Maps platform.
     * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
     */
    public static getBaseMapProviderViewModels(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean): ProviderViewModel[] {
        const pvm = [];
        const td =  Constants.TILESETS;

        Object.keys(td).forEach(tilesetId => {
            const ts = td[tilesetId];
            if(ts && ts.isBasemap) {
                pvm.push(AzureMapsImageryProvider.getProviderViewModel(Object.assign({}, options, {
                    tilesetId: tilesetId
                }), prependAzureMaps));
            }
        });

        return pvm;
    }

    /************************
     * Public functions
     ***********************/

    /**
     * Gets the attributions for a tile.
     * @param x Tile x coordinate.
     * @param y Tile y coordinate.
     * @param level Tile zoom level.
     */
    public getTileCredits(x: number, y: number, level: number): Credit[] {
        const self = this;
        const ts = self._options.tilesetId;
        var partner: string;

        if (ts) {
            if (ts.startsWith('microsoft.base.') || ts.startsWith('microsoft.traffic.')) {
                partner = 'TomTom';
            } else if (ts.startsWith('microsoft.weather.')) {
                partner = 'AccuWeather';
            } else if (ts === 'microsoft.imagery') {
                partner = 'DigitalGlobe';
            }

            if (partner) {
                return [new Credit(`© ${new Date().getFullYear()} ${partner}`, true), new Credit('Microsoft', true)];
            }
        }

        return [new Credit('Microsoft', true)];
    }

    /**
     * Requests a map tile image.
     * @param x Tile x coordinate.
     * @param y Tile y coordinate.
     * @param level Tile zoom level. 
     * @param request 
     */
    public requestImage(x: number, y: number, level: number, request?: Request): Promise<HTMLImageElement | HTMLCanvasElement> | undefined {
        const self = this;

        return new Promise<HTMLImageElement | HTMLCanvasElement>((resolve, reject) => {
            if (self._options.tilesetId) {
                self._authManager.getRequest(self._getTileUrl(x, y, level)).then(r => {
                    r.blob().then(blobResponse => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const img = document.createElement("img");
                            img.setAttribute("role", "presentation");
                            img.src = <string>reader.result;
                            img.style.visibility = 'visible';
                            resolve(img);
                        };
                        reader.onerror = () => {
                            reject('Unable to load tile.');
                        };
                        reader.readAsDataURL(blobResponse);
                    });
                }, e => {
                    reject(e);
                });
            } else {
                reject('Azure Maps TilesetId not specified.');
            }
        });
    }

    /**
     * Gets the display name for the tilesetId of the imagery provider.
     */
    public getDisplayName(): string {
        const ts = Constants.TILESETS[this._options.tilesetId];
        return  (ts)? ts.name: null;
    }

    /** Gets the geopolitical view setting of the layer. */
    public getView(): string {
        return this._options.view;
    }

    /** Gets the language code used by the layer. */
    public getLanguage(): string {
        return this._options.language;
    }

    /** Gets the tileset ID of the layer. */
    public getTilesetId(): string {
        return this._options.tilesetId;
    }

    /**
     * Gets the time stamp value setting.
     */
    public getTimeStamp(): string | Date {
        return this._options.timeStamp;
    }

    /**
     * Gets the traffic flow thickness setting.
     */
    public getTrafficFlowThickness(): number {
        return this._options.trafficFlowThickness;
    }

    /************************
    * Private functions
    ***********************/
    
    /**
     * Sets the tileset ID of the layer.
     * @param tilesetId The tileset to change to.
     */
    private _setTilesetId(tilesetId: string): void {
        const self = this;
        self._options.tilesetId = tilesetId;

        self._baseUrl = _renderV2TileUrl;

        if (tilesetId.startsWith('microsoft.traffic.flow')) {
            self._baseUrl = _trafficFlowTileUrl;
        } else if (tilesetId.startsWith('microsoft.traffic.incident')) {
            self._baseUrl = _trafficIncidentTileUrl;
        }

        self._refresh();
    }

    /**
     * Gets the tile URL for the specified map tile coordinates.
     * @param coords Map tile coordinates.
     */
    private _getTileUrl(x: number, y: number, level: number): string {
        const self = this;
        return self._getFormattedUrl()
            .replace('{x}', x.toString())
            .replace('{y}', y.toString())
            .replace('{z}', level.toString());
    }

    private _refresh(): void {
        const self = this;
        var info =  Constants.TILESETS[self._options.tilesetId];

        if(!info){
            info = {
                name: '',
                maxZoom: 22,
                hasAlpha: true 
            };
        }
        super.reinitialize({
            url: self._getFormattedUrl(),
            enablePickFeatures: false,
            tileWidth: 256,
            tileHeight: 256,
            maximumLevel: info.maxZoom || 22,
            hasAlphaChannel: info.hasAlpha
        });
    }

    private _getFormattedUrl(): string {
        const self = this;
        const opt = self._options;

        var url = self._baseUrl
            .replace('{tileSize}', '256')
            .replace('{language}', opt.language)
            .replace('{view}', opt.view)
            .replace('{tilesetId}', opt.tilesetId);

        if (opt.tilesetId.startsWith('microsoft.traffic')) {
            url = url.replace('{style}', self._getTrafficStyle());

            if(opt.tilesetId.indexOf('flow') > 0) {
                url +=  '&thickness=' + self._options.trafficFlowThickness;
            }
        }

        if (opt.timeStamp) {
            var ts = <string>opt.timeStamp;

            if (opt.timeStamp instanceof Date) {
                //Create an ISO 8601 timestamp string.
                //JavaScripts format for ISO string includes decimal seconds and the letter "Z" at the end that is not supported. Use slice to remove this.
                ts = opt.timeStamp.toISOString().slice(0, 19);
            }

            url = url.replace('{timeStamp}', ts);
        }

        return url;
    }

    private _getTrafficStyle(): string {
        const ts = this._options.tilesetId;

        if(ts.indexOf('microsoft.traffic.')> -1){
            return ts.replace('microsoft.traffic.incident.', '').replace('microsoft.traffic.flow.', '');
        }

        return null;
    }
}