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