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