---
page_type: sample
description: A Cesium JS plugin that makes it easy to overlay tile layers from the Azure Maps tile services.
languages:
- javascript
- typescript
products:
- azure
- azure-maps
---

# Azure Maps Cesium JS plugin

A [Cesium JS](https://cesium.com/cesiumjs/) plugin that makes it easy to integrate Azure Maps services such as [tile layers](https://docs.microsoft.com/rest/api/maps/renderv2/getmaptilepreview) and [geocoding services](https://docs.microsoft.com/en-us/rest/api/maps/search).

**Features:**

- Authenticate using an Azure Maps subscription key or Azure Active Directory.
- Works with with Azure Public and Government clouds.
- [Supports over 30 languages](https://docs.microsoft.com/azure/azure-maps/supported-languages)
- Geocoding service class that aligns with Cesiums `GeocoderService` interface and can be used with the geocoder widget in Cesium.
- Additional search service support via the geocoding service class for forward and reverse geocoding of addresses and cross streets, points of interest (POI) search, and POI category search.
- Supported imagery provider layers:
    - **Road maps**
        - Main (`microsoft.base.road`) - All layers with our main style.
        - Labels (`microsoft.base.labels.road`) - Label data in our main style.
        - Hybrid (`microsoft.base.hybrid.road`) - Road, boundary and label data in our main style.
        - Dark grayscale (`microsoft.base.darkgrey`) - All layers with our dark grayscale style.
    - **Imagery** (`microsoft.imagery`)
    - **Traffic Flow**
        - absolute (`microsoft.traffic.flow.absolute`)
        - reduced-sensitivity (`microsoft.traffic.flow.reduced-sensitivity`)
        - relative (`microsoft.traffic.flow.relative`)
        - relative-delay (microsoft.traffic.flow.relative-delay`)
    - **Traffic Incident**
        - night (`microsoft.traffic.incident.night`)
        - s1 (`microsoft.traffic.incident.s1`)
        - s2 (`microsoft.traffic.incident.s2`)
        - s3 (`microsoft.traffic.incident.s3`)
    - **Weather**
        - Infrared (`microsoft.weather.infrared.main`) - Latest Infrared Satellite images shows clouds by their temperature.
        - Radar (`microsoft.weather.radar.main`) - Latest weather radar images including areas of rain, snow, ice and mixed conditions.
- Use time stamps with weather layers to get recent and forecast data.
- Adjust the line thickness in traffic flow layers.

Currently supports raster (i.e PNG) tiles, support for vector tiles is being investigated. Azure Maps DEM tiles being investigated as a potential terrain provider.

**Samples**

[Render Azure Maps in Cesium](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Render%20Azure%20Maps%20in%20Cesium)
<br/>[<img src="https://github.com/Azure-Samples/AzureMapsCodeSamples/raw/master/AzureMapsCodeSamples/SiteResources/screenshots/Render-Azure-Maps-in-Cesium.jpg" height="200px">](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Render%20Azure%20Maps%20in%20Cesium)

[Show Azure Maps in Cesium BaseLayerPicker](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Show%20Azure%20Maps%20in%20Cesium%20BaseLayerPicker)
<br/>[<img src="https://github.com/Azure-Samples/AzureMapsCodeSamples/raw/master/AzureMapsCodeSamples/SiteResources/screenshots/Show-Azure-Maps-in-Cesium-BaseLayerPicker.jpg" height="200px">](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Show%20Azure%20Maps%20in%20Cesium%20BaseLayerPicker)

[Azure Maps Cesium options](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Azure%20Maps%20Cesium%20options)
<br/>[<img src="https://github.com/Azure-Samples/AzureMapsCodeSamples/raw/master/AzureMapsCodeSamples/SiteResources/screenshots/Azure-Maps-Cesium-options.jpg" height="200px">](https://azuremapscodesamples.azurewebsites.net/index.html?sample=Azure%20Maps%20Cesium%20options)

## Getting started

Download the project and copy the `azure-maps-cesium` JavaScript file from the `dist` folder into your project.

See the [documentation](https://github.com/Azure-Samples/azure-maps-cesium/blob/main/docs/APIReference.md) for more details on a specific feature or take a look at one of the samples below.

**Usage**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Add references to the CesiumJS Map control JavaScript and CSS files. -->
    <link rel="stylesheet" href="https://cesiumjs.org/releases/1.77/Build/Cesium/Widgets/widgets.css" type="text/css" />
    <script src="https://cesiumjs.org/releases/1.77/Build/Cesium/Cesium.js"></script>

    <!-- Add reference to the Azure Maps Cesium plugin. -->
    <script src="../dist/azure-maps-cesium.js"></script>

    <script type='text/javascript'>
        var viewer;

        function GetMap() {
            //Create a map instance.
            viewer = new Cesium.Viewer('myMap', {
                //Create an Azure Maps imagery provider for the base road tileset. 
                imageryProvider: new Cesium.AzureMapsImageryProvider({
                    //Add authentication details for connecting to Azure Maps.
                    authOptions: {
                        //Use Azure Active Directory authentication.
                        authType: "anonymous",
                        clientId: "04ec075f-3827-4aed-9975-d56301a2d663", //Your Azure Active Directory client id for accessing your Azure Maps account.
                        getToken: function (resolve, reject, map) {
                            //URL to your authentication service that retrieves an Azure Active Directory Token.
                            var tokenServiceUrl = "https://azuremapscodesamples.azurewebsites.net/Common/TokenService.ashx";
                    
                            fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
                        }

                        //Alternatively, use an Azure Maps key. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
                        //authType: 'subscriptionKey',
                        //subscriptionKey: '<Your Azure Maps Key>'
                    },

                    //Set the tilesetId to display as the imagery provider.
                    tilesetId: 'microsoft.base.road',

                    //Optional: set the language of the map labels.
                    //language: 'fr-FR',

                    //Optional: set the geopolitical view of the map.
                    //view: 'Auto',
                    
                    //Optional: if using a weather layer, specify a timestamp to get recent or forecast data.
                    //timeStamp: '2019-11-14T16:03:00-08:00'
                }),
                
                //Disable the base layer picker and geocoder by default.
                baseLayerPicker: false,
                geocoder: false
            });
        }
    </script>
</head>
<body onload="GetMap()">
    <div id="myMap" style="position:relative;width:100%;min-width:290px;height:600px;"></div>
</body>
</html>
```

If using Azure Government cloud, set the Azure Maps domain in the `authOptions` to `'atlas.azure.us'`.

```javascript
authOptions: {
    azMapsDomain: 'atlas.azure.us'    
    //Your other authentication options.
}
```

More details on authentication options for Azure Maps is [documented here](https://docs.microsoft.com/azure/azure-maps/how-to-manage-authentication).

### Alternative Option for Cesium

This Cesium plugin makes it easy to add Azure Maps imagery providers using any of the supported authentication methods available in Azure Maps; subscription key or Azure Active Directory (recommended). If you are only using a subscription key and don't plan to use Azure Active Directory, the following code can be used instead to easily create a simple Azure Maps imagery provider in Cesium without having to use this plugin.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!-- Add references to the CesiumJS Map control JavaScript and CSS files. -->
    <link rel="stylesheet" href="https://cesiumjs.org/releases/1.18/Build/Cesium/Widgets/widgets.css" type="text/css" />
    <script src="https://cesiumjs.org/releases/1.44/Build/Cesium/Cesium.js"></script>

    <script type='text/javascript'>
        var map;

        async function GetMap() {
            map = new Cesium.Viewer('myMap', {
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: new Cesium.Resource({
                        url: 'https://atlas.microsoft.com/map/tile?api-version=2.0&zoom={z}&x={x}&y={y}&tileSize=512',
                        tileWidth: 512,
                        tileHeight: 512,
                        queryParameters: {
                            //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
                            'subscription-key': '<Your Azure Maps Key>' 

                            /*
                                Tileset ID specifies which data layers to render in the tiles. Can be:
                                                     
                                'microsoft.base.road',  
                                'microsoft.base.darkgrey',
                                'microsoft.imagery', //Only supports tile width/height of 256
                                'microsoft.weather.infrared.main', 
                                'microsoft.weather.radar.main', 
                                'microsoft.base.hybrid.road',
                                'microsoft.base.labels.road '
                            */
                            tilesetId: 'microsoft.base.road',

                            //The language of labels. Supported languages: https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages
                            language: 'en-US',

                            //The regional view of the map. Supported views: https://aka.ms/AzureMapsLocalizationViews
                            view: 'Auto'
                        }
                    }),
                    credit: new Cesium.Credit(`© ${new Date().getFullYear()} TomTom, Microsoft`, true),
                    maximumLevel: 18,
                    enablePickFeatures: false
                }),
                baseLayerPicker: false
            });
        }
    </script>
</head>
<body onload="GetMap()">
    <div id="myMap" style="position:relative;width:100%;min-width:290px;height:600px;"></div>
</body>
</html>
```

## Related Projects

* [Azure Maps Web SDK Open modules](https://github.com/microsoft/Maps/blob/master/AzureMaps.md#open-web-sdk-modules) - A collection of open source modules that extend the Azure Maps Web SDK.
* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Gov Cloud Web SDK Samples](https://github.com/Azure-Samples/AzureMapsGovCloudCodeSamples)
* [Azure Maps & Azure Active Directory Samples](https://github.com/Azure-Samples/Azure-Maps-AzureAD-Samples)
* [List of open-source Azure Maps projects](https://github.com/microsoft/Maps/blob/master/AzureMaps.md)

## Additional Resources

* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## Contributing

We welcome contributions. Feel free to submit code samples, file issues and pull requests on the repo and we'll address them as we can. 
Learn more about how you can help on our [Contribution Rules & Guidelines](https://github.com/Azure-Samples/azure-maps-cesium/blob/main/CONTRIBUTING.md). 

You can reach out to us anytime with questions and suggestions using our communities below:
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). 
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or 
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

MIT

See [License](https://github.com/Azure-Samples/azure-maps-cesium/blob/main/LICENSE.md) for full license text.