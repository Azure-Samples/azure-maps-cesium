# API Reference

The following document is the complete API reference for the Azure Maps Cesium JS plugin.

- Cesium
    - [AzureMapsImageryProvider](#AzureMapsImageryProvider-class)
    - [AzureMapsGeocoderService](#AzureMapsGeocoderService-class)
- Options Interfaces
    - [AuthenticationOptions](#AuthenticationOptions-interface)
    - [AzureMapsImageryProviderOptions](#AzureMapsImageryProviderOptions-interface)
    - [AzureMapsGeocoderServiceOptions](#AzureMapsImageryProviderOptions-interface)
- Enums
    - [AzureMapsSearchServices](#AzureMapsSearchServices-Enum)
    - [AzureMapsTilesets](#AzureMapsTilesets-Enum)

## AzureMapsImageryProvider class

**Extends:** `Cesium.ImageryProvider`

**Namespace:** `Cesium`

An imagery provider that connects to the Azure Maps Render V2 service.

**Contstructor**

> `AzureMapsImageryProvider(options?: AzureMapsImageryProviderOptions)`

**Methods**

| Name | Return type | Description |
|------|------|-------------|
| `getTileCredits(x: number, y: number, level: number)` | `Credit[]` | Gets the attributions for a tile. |
| `requestImage(x: number, y: number, level: number, request?: Request)` | `Promise<HTMLImageElement | HTMLCanvasElement> | undefined` | Requests a map tile image. |
| `getDisplayName()` | `string` | Gets the display name for the tilesetId of the imagery provider. |
| `getLanguage()` | `string` |Gets the language code used by the layer. |
| `getTilesetId()` | `string` | Gets the tileset ID of the layer. |
| `getTimeStamp()` | `string` \| `Date` | Gets the time stamp value setting. |
| `getTrafficFlowThickness()` | `number` | Gets the traffic flow thickness setting. |
| `getView()` | `string` | Gets the geopolitical view setting of the layer. |

**Static Methods**

| Name | Return type | Description |
|------|------|-------------|
| `getImageryLayer(azMapsOptions: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions)` | `ImageryLayer` | Gets an Azure Maps imagery provider as an ImageryLayer. |
| `getAllOverlayImageryLayer(azMapsOptions?: AzureMapsImageryProviderOptions, layerOptions?: ImageryLayerOptions)` | `ImageryLayer[]` | Gets an array of all overlay imagery layers that are not base map layers from Azure Maps. |
| `getProviderViewModel(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean)` | `ProviderViewModel` | Gets a ProviderViewModel for an Azure Maps layer. |
| `getBaseMapProviderViewModels(options: AzureMapsImageryProviderOptions, prependAzureMaps?: boolean)` | `ProviderViewModel[]` | Gets an array of ProviderViewModel for all Azure Maps layer. |

## AzureMapsGeocoderService class

**Implements:** `Cesium.GeocoderService`

**Namespace:** `Cesium`

A geocoding service powered by Azure Maps.

**Contstructor**

> `AzureMapsGeocoderService(options?: AzureMapsGeocoderServiceOptions)`

**Methods**

| Name | Return type | Description |
|------|------|-------------|
| `geocode(query: string, type: 'SEARCH' | 'AUTOCOMPLETE')` | `Promise<Array<GeocoderService.Result>>` | Processes a search query. |

## AuthenticationOptions interface

Authentication options for connecting to the Azure Maps tile services.

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `aadAppId` | `string` | The Azure AD registered app ID. This is the app ID of an app registered in your Azure AD tenant. Must be specified for AAD authentication type. |
| `aadInstance` | `string` | The AAD instance to use for logging in. Can be optionally specified when using the AAD authentication type. By default the `https://login.microsoftonline.com/` instance will be used. |
| `aadTenant` | `string` | The AAD tenant that owns the registered app specified by `aadAppId`. Must be specified for AAD authentication type. |
| `authContext` | `AuthenticationContext` | Optionally provide an existing `AuthenticationContext` from the ADAL.js library. This authentication context will be used to acquire the AAD token. Only used with the AAD authentication type. This auth context must be configured to use the same AAD app ID as `this.aadAppId`. If this is not provided all map instances will share their own private auth context. |
| `authType` | `'subscriptionKey'` \| `'aad'` \| `'anonymous'` | The authentication mechanism to be used. |
| `azMapsDomain` | `string` | A URL string pointing to the domain of the Azure Maps service, default is `'atlas.microsoft.com'`. Set to `'atlas.azure.us'` if using the US Azure Government cloud. |
| `clientId` | `string` | The Azure Maps client ID, This is an unique identifier used to identify the maps account. Preferred to always be specified, but must be specified for AAD and anonymous authentication types. |
| `getToken` | `(resolve: (value?: string) => void, reject: (reason?: any) => void) => void` | A callback to use with the anonymous authentication mechanism. This callback will be responsible for resolving to a authentication token. E.g. fetching a CORS protected token from an endpoint. |
| `subscriptionKey` | `string` | Subscription key from your Azure Maps account. Must be specified for subscription key authentication type. |

## AzureMapsImageryProviderOptions interface

Options for an Azure Maps imagery provider.

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `authOptions` | `AuthenticationOptions` | **Required.** Authentication options for connecting to Azure Maps. |
| `language` | `string` | Language code. [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) Default: `'en-US'` |
| `tilesetId` | `string` \| `AzureMapsTilesets` | The tile set ID layer to load from the Azure Maps Render V2 service. Supported values:<br/><br/>`'microsoft.base.road',`<br/> `'microsoft.base.darkgrey'`<br/> `'microsoft.imagery'`<br/> `'microsoft.weather.infrared.main'`<br/> `'microsoft.weather.radar.main'`<br/> `'microsoft.base.hybrid.road'`<br/> `'microsoft.base.labels.road'`<br/> `'microsoft.traffic.incident.night'`<br/> `'microsoft.traffic.incident.s1'`<br/> `'microsoft.traffic.incident.s2'`<br/> `'microsoft.traffic.incident.s3'`<br/> `'microsoft.traffic.flow.absolute'`<br/> `'microsoft.traffic.flow.reduced-sensitivity'`<br/> `'microsoft.traffic.flow.relative'`<br/> `'microsoft.traffic.flow.relative-delay'`. Custom tileset ID's that return raster tiles that are 256x256 pixels in size can also be specified as a string. Default `'microsoft.base.road'` |
| `timeStamp` | `string` \| `Date` | The desired date and time of the requested tile. This parameter must be specified in the standard date-time format (e.g. 2019-11-14T16:03:00-08:00), as defined by ISO 8601. This parameter is only supported when tilesetId parameter is set to `microsoft.weather.infrared.main` or `microsoft.weather.radar.main`. |
| `trafficFlowThickness` | `number` | The thickness of lines when using the traffic flow tilesets. Default: `5` |
| `view` | `string` | Geopolitical view of the map. [Supported views](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages#sdks) Default: `'Auto'` |

## AzureMapsGeocoderServiceOptions interface

Options for the AzureMapsGeocoderService.

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `authOptions` | `AuthenticationOptions` | **Required.** Authentication options for connecting to Azure Maps. |
| `language` | `string` | Language code. [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) Default: `'en-US'` |
| `limit` | `number` | The maximum number of results to return. Must be a number between 1 and 100. Ignored when when `searchService` is set to `ADDRESS_REVERSE`. Default: `10` |
| `preferRectangle` | `boolean` | Specifies if there is a preference for results to return a Rectangle instead of a Cartesian3. Default: `true` |
| `searchService` | `string` \| `AzureMapsSearchServices` | The Azure Maps search service to call. Default: `'FUZZY'` |
| `view` | `string` | Geopolitical view of the map. [Supported views](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages#sdks) Default: `'Auto'` |

## AzureMapsSearchServices Enum

**Namespace**: `Cesium`

Enum of Azure Maps search services that can be accessed by the `AzureMapsGeocoderService`.

| Name | Value | Description |
|------|------|-------------|
| `ADDRESS` | `'ADDRESS'` | Address geocoder. |
| `ADDRESS_REVERSE` | `'ADDRESS_REVERSE'` | Reverse geocoder. Coordinates to address |
| `ADDRESS_REVERSE_CROSSSTREET` | `'ADDRESS_REVERSE_CROSSSTREET'` | Reverse geocoder to nearby cross street(s). |
| `FUZZY` | `'FUZZY'` | Fuzzy search which combines of address geocoding and point of interest search. |
| `POI` | `'POI'` | Fuzzy search which combines of address geocoding and point of interest search. |
| `POI_CATEGORY` | `'POI_CATEGORY'` | Point of interest category search. |

## AzureMapsTilesets Enum

**Namespace**: `Cesium`

Enum of Azure Maps raster tilesets available from Azure Maps.

| Name | Value | Description |
|------|------|-------------|
| `DARK_GRAYSCALE_ROAD` | `'microsoft.base.darkgrey'` | Standard road map in a dark grayscale style. |
| `IMAGERY` | `'microsoft.imagery'` | Satellite imagery. |
| `ROAD` | `'microsoft.base.road'` | Standard road map. |
| `ROAD_HYBRID` | `'microsoft.base.hybrid.road'` | Road maps of road features and labels, no background. |
| `ROAD_LABELS` | `'microsoft.base.labels.road'` | Road map labels, no background. |
| `TRAFFIC_FLOW_ABSOLUTE` | `'microsoft.traffic.flow.absolute'` | Colors will reflect the absolute speed measured. Absolute speed is the capability to access the full speed. |
| `TRAFFIC_FLOW_REDUCED_SENSITIVITY` | `'microsoft.traffic.flow.reduced-sensitivity'` | Displays relative colors but a larger difference from free flow is required for segments to change the color.  |
| `TRAFFIC_FLOW_RELATIVE` | `'microsoft.traffic.flow.relative'` | This is the speed relative to free-flow, highlighting areas of congestion visualizing the traffic flow. Free-flow refers to conditions where there is no congestion and traffic can follow the speed limits. The most used option to visualize traffic flow on a map. |
| `TRAFFIC_FLOW_RELATIVE_DELAY` | `'microsoft.traffic.flow.relative-delay'` | Displays relative colors only where they are different from the free-flow speeds. This option will only highlights areas of congestion. |
| `TRAFFIC_INCIDENT_NIGHT` | `'microsoft.traffic.incident.night'` | Night styled traffic incident overlay. |
| `TRAFFIC_INCIDENT_S1` | `'microsoft.traffic.incident.s1'` | Creates traffic lines with colored chevrons indicating severity. |
| `TRAFFIC_INCIDENT_S2` | `'microsoft.traffic.incident.s2'` | Creates plain lines with certain degree of glow. |
| `TRAFFIC_INCIDENT_S3` | `'microsoft.traffic.incident.s3'` | Creates plain lines with certain degree of glow. |
| `WEATHER_INFRARED` | `'microsoft.weather.infrared.main'` | Weather infrared tiles. Latest Infrared Satellite images shows clouds by their temperature. |
| `WEATHER_RADAR` | `'microsoft.weather.radar.main'` | Weather radar tiles. Latest weather radar images including areas of rain, snow, ice and mixed conditions. |
