import { AuthenticationOptions } from './AuthenticationOptions';
import { AzureMapsSearchServices } from './AzureMapsSearchServices';

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