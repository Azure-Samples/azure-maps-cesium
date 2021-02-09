import AuthenticationContext from 'adal-angular';
import { Rectangle, Cartesian3, UrlTemplateImageryProvider, ImageryLayer, ProviderViewModel, Credit } from 'cesium';

declare namespace Cesium {

    /** Enum of Azure Maps raster tilesets available from Azure Maps. */
    export enum AzureMapsTilesets {
        /** Standard road map. */
        ROAD = 'microsoft.base.road',

        /** Standard road map in a dark grayscale style. */
        DARK_GRAYSCALE_ROAD = "microsoft.base.darkgrey",

        /** Road map labels, no background. */
        ROAD_LABELS = "microsoft.base.labels.road",

        /** Road maps of road features and labels, no background. */
        ROAD_HYBRID = "microsoft.base.hybrid.road",

        /** Satellite imagery. */
        IMAGERY = "microsoft.imagery",

        /** Colors will reflect the absolute speed measured. Absolute speed is the capability to access the full speed. */
        TRAFFIC_FLOW_ABSOLUTE = "microsoft.traffic.flow.absolute",

        /** Displays relative colors but a larger difference from free flow is required for segments to change the color. */
        TRAFFIC_FLOW_REDUCED_SENSITIVITY = "microsoft.traffic.flow.reduced-sensitivity",

        /** This is the speed relative to free-flow, highlighting areas of congestion visualizing the traffic flow. Free-flow refers to conditions where there is no congestion and traffic can follow the speed limits. The most used option to visualize traffic flow on a map. */
        TRAFFIC_FLOW_RELATIVE = "microsoft.traffic.flow.relative",

        /** Displays relative colors only where they are different from the free-flow speeds. This option will only highlights areas of congestion. */
        TRAFFIC_FLOW_RELATIVE_DELAY = "microsoft.traffic.flow.relative-delay",

        /** Night styled traffic incident overlay. */
        TRAFFIC_INCIDENT_NIGHT = "microsoft.traffic.incident.night",

        /** Creates traffic lines with colored chevrons indicating severity. */
        TRAFFIC_INCIDENT_S1 = "microsoft.traffic.incident.s1",

        /** Creates plain lines with certain degree of glow. */
        TRAFFIC_INCIDENT_S2 = "microsoft.traffic.incident.s2",

        /** Creates plain lines with certain degree of glow. */
        TRAFFIC_INCIDENT_S3 = "microsoft.traffic.incident.s3",

        /** Weather infrared tiles. Latest Infrared Satellite images shows clouds by their temperature. */
        WEATHER_INFRARED = "microsoft.weather.infrared.main",

        /** Weather radar tiles. Latest weather radar images including areas of rain, snow, ice and mixed conditions. */
        WEATHER_RADAR = "microsoft.weather.radar.main"
    }

    /** Enum of Azure Maps search services that can be accessed by the `AzureMapsGeocoderService`. */
    export enum AzureMapsSearchServices {
        /** Address geocoder. */
        ADDRESS = "ADDRESS",

        /** Reverse geocoder. Coordinates to address. */
        ADDRESS_REVERSE = "ADDRESS_REVERSE",

        /** Reverse geocoder to nearby cross street(s). */
        ADDRESS_REVERSE_CROSSSTREET = "ADDRESS_REVERSE_CROSSSTREET",

        /** Fuzzy search which combines of address geocoding and point of interest search. */
        FUZZY = "FUZZY",

        /** Point of interest search. */
        POI = "POI",

        /** Point of interest category search. */
        POI_CATEGORY = "POI_CATEGORY"
    }

    /** A geocoding service powered by Azure Maps. */
    export class AzureMapsGeocoderService {
        /************************
         * Constructor
         ***********************/

        /**
         * A geocoding service powered by Azure Maps.
         * @param options The options for the geocoding service.
         */
        constructor(options: AzureMapsGeocoderServiceOptions);

        /**
         * Processes a search query.
         * @param query The query to geocode.
         * @param type Type of geocode search to perform. A regular SEARCH, or an AUTOCOMPLETE. When in auto complete mode, the service goes into predictive mode.
         */
        public geocode(query: string, type: 'SEARCH' | 'AUTOCOMPLETE'): Promise<Array<GeocodeResult>>;
    }

    /** Options for the AzureMapsGeocoderService. */
    export interface AzureMapsGeocoderServiceOptions {
        /** Required. Authentication options for connecting to Azure Maps. */
        authOptions?: AuthenticationOptions;

        /** Geopolitical view of the map. Default: `'Auto'` */
        view?: string;

        /** Language code. [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages). Default: `'en-US'` */
        language?: string;

        /** The Azure Maps search service to call. Default: `'FUZZY'` */
        searchService?: string | AzureMapsSearchServices;

        /** Specifies if there is a preference for results to return a Rectangle instead of a Cartesian3. Default: `true` */
        preferRectangle?: boolean;

        /** The maximum number of results to return. Must be a number between 1 and 100. Ignored when when `searchService` is set to `ADDRESS_REVERSE`. Default: `10`  */
        limit?: number;
    }

    /** Options for an Azure Maps imagery provider. */
    export interface AzureMapsImageryProviderOptions {
        /** Required. Authentication options for connecting to Azure Maps. */
        authOptions?: AuthenticationOptions;

        /** The tile set ID layer to load from the Azure Maps Render V2 service. Custom tileset ID's that return raster tiles that are 256x256 pixels in size can also be specified as a string. Default `'microsoft.base.road'` */
        tilesetId?: string | AzureMapsTilesets;

        /** Geopolitical view of the map. [Supported views](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages#sdks) Default: `'Auto'` */
        view?: string;

        /** Language code. [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) Default: `'en-US'` */
        language?: string;

        /** The desired date and time of the requested tile. This parameter must be specified in the standard date-time format (e.g. 2019-11-14T16:03:00-08:00), as defined by ISO 8601. This parameter is only supported when tilesetId parameter is set to `microsoft.weather.infrared.main` or `microsoft.weather.radar.main`. */
        timeStamp?: string | Date;

        /** The thickness of lines when using the traffic flow tilesets. Default: 5 */
        trafficFlowThickness?: number;
    }

    /**
     * The callback function used to acquire an authentication token in anonymous authentication mode.
     * Resolve with the authentication token or reject with any errors.
     */
    export type getAuthTokenCallback = (resolve: (value?: string) => void, reject: (reason?: any) => void) => void;

    /**
     * Options for specifying how the map control should authenticate with the Azure Maps services.
     */
    export interface AuthenticationOptions {
        /** A URL string pointing to the domain of the Azure Maps service, default is `"atlas.microsoft.com"`. */
        azMapsDomain?: string;

        /**
         * The authentication mechanism to be used.
         */
        authType?: 'subscriptionKey' | 'aad' | 'anonymous';

        /**
         * Subscription key from your Azure Maps account.
         * Must be specified for subscription key authentication type.
         */
        subscriptionKey?: string;

        /**
         * The Azure Maps client ID, This is an unique identifier used to identify the maps account.
         * Preferred to always be specified, but must be specified for AAD and anonymous authentication types.
         */
        clientId?: string;

        /**
         * The Azure AD registered app ID. This is the app ID of an app registered in your Azure AD tenant.
         * Must be specified for AAD authentication type.
         */
        aadAppId?: string;

        /**
         * The AAD tenant that owns the registered app specified by `aadAppId`.
         * Must be specified for AAD authentication type.
         */
        aadTenant?: string;

        /**
         * The AAD instance to use for logging in.
         * Can be optionally specified when using the AAD authentication type.
         * By default the `https://login.microsoftonline.com/` instance will be used.
         */
        aadInstance?: string;

        /**
         * A callback to use with the anonymous authentication mechanism.
         * This callback will be responsible for resolving to a authentication token.
         * E.g. fetching a CORS protected token from an endpoint.
         */
        getToken?: getAuthTokenCallback;

        /**
         * Optionally provide an existing `AuthenticationContext` from the ADAL.js library.
         * This authentication context will be used to acquire the AAD token.
         * Only used with the AAD authentication type.
         * This auth context must be configured to use the same AAD app ID as `this.aadAppId`.
         * If this is not provided all map instances will share their own private auth context.
         */
        authContext?: AuthenticationContext;
    }

    /** Geocode result object. */
    interface GeocodeResult {
        /** The display name for a location. */
        displayName: string;

        /** The bounding box for a location. */
        destination: Rectangle | Cartesian3;
    }

    /**
     * An imagery provider that connects to the Azure Maps Render V2 service.
     */
    export class AzureMapsImageryProvider extends UrlTemplateImageryProvider {

        /************************
         * Constructor
         ***********************/

        /**
         * An imagery provider that connects to the Azure Maps Render V2 service.
         * @param options Azure Maps Tile layer options.
         */
        constructor(options: AzureMapsImageryProviderOptions);

        /**
         * Gets an Azure Maps imagery provider as an ImageryLayer.
         * @param azMapsOptions Options for connecting to the Azure Maps platform.
         * @param layerOptions Options for the imagery layer.
         */
        public static getImageryLayer(azMapsOptions: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions): ImageryLayer;

        /**
         * Gets an array of all overlay imagery layers that are not base map layers from Azure Maps.
         * @param azMapsOptions Options for connecting to the Azure Maps platform.
         * @param layerOptions Options for the imagery layer.
         */
        public static getAllOverlayImageryLayer(azMapsOptions?: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions): ImageryLayer[];

        /**
         * Gets a ProviderViewModel for an Azure Maps layer.
         * @param options Options for connecting to the Azure Maps platform.
         * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
         */
        public static getProviderViewModel(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean): ProviderViewModel;

        /**
         * Gets an array of ProviderViewModel for all Azure Maps layer.
         * @param options Options for connecting to the Azure Maps platform.
         * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
         */
        public static getBaseMapProviderViewModels(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean): ProviderViewModel[];

        /************************
         * Public functions
         ***********************/

        /**
         * Gets the attributions for a tile.
         * @param x Tile x coordinate.
         * @param y Tile y coordinate.
         * @param level Tile zoom level.
         */
        public getTileCredits(x: number, y: number, level: number): Credit[];

        /**
         * Requests a map tile image.
         * @param x Tile x coordinate.
         * @param y Tile y coordinate.
         * @param level Tile zoom level. 
         * @param request 
         */
        public requestImage(x: number, y: number, level: number, request?: Request): Promise<HTMLImageElement | HTMLCanvasElement> | undefined;

        /**
         * Gets the display name for the tilesetId of the imagery provider.
         */
        public getDisplayName(): string;

        /** Gets the geopolitical view setting of the layer. */
        public getView(): string;

        /** Gets the language code used by the layer. */
        public getLanguage(): string;

        /** Gets the tileset ID of the layer. */
        public getTilesetId(): string;

        /**
         * Gets the time stamp value setting.
         */
        public getTimeStamp(): string | Date;
        
        /**
         * Gets the traffic flow thickness setting.
         */
        public getTrafficFlowThickness(): number;
    }

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
}

export = Cesium;