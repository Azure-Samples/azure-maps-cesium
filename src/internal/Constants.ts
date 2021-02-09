export interface TilesetInfo {
    name: string;

    /** Max zoom level layer available at. Default: 22 */
    maxZoom?: number;
    icon?: string;
    hasAlpha?: boolean;
    isBasemap?: boolean;
}

export const Constants = {
    // Enable localStorage for IE, as sessionStorage does not work for localhost.
    preferredCacheLocation: "localStorage",
    storage: {
        accessTokenKey: "access.token.key",
        testStorageKey: "testStorage"
    },
    events: {
        tokenAcquired: "tokenacquired"
    },
    tokenExpiresIn: 3599,
    tokenRefreshClockSkew: 300,
    errors: {
        tokenExpired: "Token Expired, Try again"
    },
    AUTHORIZATION: "authorization",
    AUTHORIZATION_SCHEME: "Bearer",
    MAP_AGENT: "Map-Agent",
    MS_AM_REQUEST_ORIGIN: "Ms-Am-Request-Origin",
    MS_AM_REQUEST_ORIGIN_VALUE: "MapControl",
    X_MS_CLIENT_ID: "x-ms-client-id",
    SESSION_ID: "Session-Id",
    SHORT_DOMAIN: 'atlas.microsoft.com',
    DEFAULT_DOMAIN: 'https://atlas.microsoft.com/',
    SDK_VERSION: '0.0.1',
    TARGET_SDK: 'Cesium',
    TILESETS: <Record<string, TilesetInfo>>{
        'microsoft.base.road': {
            name: 'Road',
            icon: 'data:image/jpeg;base64,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',
            isBasemap: true
        },
        'microsoft.base.labels.road': {
            name: 'Road Labels',
            hasAlpha: true
        },
        'microsoft.base.hybrid.road': {
            name: 'Road Hybrid',
            hasAlpha: true
        },
        'microsoft.base.darkgrey': {
            name: 'Dark Grayscale Road',
            icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAA8ADwDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAECBgMEBQj/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/2gAMAwEAAhADEAAAAfOXo+UJDbrew8Nc4lIaahqwIDdp07/HVOJQpip6cKA6XPt3OOkRJOaFZ0ZJGaturz77FbAxFa0ZADvcdWWszMUgp+rAgLRn25q2CRBFT1YUBZs+zZreMxKJSKlqwgFj4a9unRTEokR//8QAJBAAAgEDAgYDAAAAAAAAAAAAAAECAwQSESAUISIxMjMQE0H/2gAIAQEAAQUC+bX3C7Ysxey094+Q9tlHrXf9xFFmVsJ2p9lmUVRUNYGR1GkTjGcUcTEpzWCnzc5HUaPZT9a7sltoLSjHyJC2W3OhHyJCP//EACIRAAADCAMBAAAAAAAAAAAAAAACMAEDERIgIjEyEFFhIf/aAAgBAwEBPwHkmyDvZB3mmwWCLvoFhD5TP4JvBMzoMwgzCBcIE1p//8QAIBEAAAUEAwEAAAAAAAAAAAAAAAECMDEREiAiECFhQf/aAAgBAgEBPwHlUMKhheOw2FFg6/R3haLfRb6DYOWDlhU4/wD/xAAlEAABAwEIAgMAAAAAAAAAAAABAAIQIAMRITEzQXGRIjJRksH/2gAIAQEABj8CluMGMqBFyFJPwhH4tgvW07Xranpab14NuBjALZgW5WnZ/VaLOloMTfADBZBZRnQ3hCBxSzhCBxS1CBH/xAAkEAACAQMDBAMBAAAAAAAAAAAAAREhMaEgUWEQQXGRgbHhwf/aAAgBAQABPyHqzVp0VuKpxsW60LPAn0oZFngLQ59ukGcOW3diqrfZcRWNkt1+FF3XyGF+t+iI2VlZEhqFgaS014+iwC2uckuwRd2ie7/YzEtCmxTFYrAl+z9G5Vy9Dy9bDOGqxnFel8AGQO7LCsIIILjt/RPYNVYlPEWh/9oADAMBAAIAAwAAABBpEr5barVbZOEHF29JBmRbDIdbNHfbHFX/xAAfEQACAgEFAQEAAAAAAAAAAAAAAREhECAwMVFhQZH/2gAIAQMBAT8QzxZjSlNhbPMYnoxNfjPQIsk5KJLIJdPwj0PIOoUSSyyNF12FhdhpQWHj/8QAHREAAgEFAQEAAAAAAAAAAAAAAAERECAhMVFhcf/aAAgBAgEBPxCuyjJRKuvRWtiB0klEdojtHoPPIgQYJZHrPoS6EcvI16JIwSrNg9CEOzcPVEN2bB6ohn//xAAmEAEAAgEBCAIDAQAAAAAAAAABABExIRBBUWFxkbHBofCB0eHx/9oACAEBAAE/EF1ly2VkrqO+ysS3iyjStDTh9CKmnblP0xztvu5Hw7NIcmvVKpnV1tg0jnbx211f8YLDk8wDAo4Myml3rf4mhAdzFxZ3W+SW4LhS+Km+fkfqMJz9i9dZdStlavbF8i90fxlHAvAGj+5VbdvJV94q+GE9ohPaAe4psmCtaDSAAHaGLl9ol7lFmN4/vL9SODVjnaTBRzZwQ2fL5ius5d8ylXNzYFxztABi7uX7nx3mfIZ9DmwHdHVtGrVtjsg8TtfzCOsz6HiwVdZ//9k=',
            isBasemap: true
        },
        'microsoft.imagery': {
            name: 'Imagery',
            maxZoom: 19,
            icon: 'data:image/jpeg;base64,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',
            isBasemap: true
        },
        'microsoft.traffic.flow.absolute': {
            name: 'Traffic flow (absolute)',
            hasAlpha: true
        },
        'microsoft.traffic.flow.reduced-sensitivity': {
            name: 'Traffic flow (reduced-sensitivity)',
            hasAlpha: true
        },
        'microsoft.traffic.flow.relative': {
            name: 'Traffic flow (relative)',
            hasAlpha: true
        },
        'microsoft.traffic.flow.relative-delay': {
            name: 'Traffic flow (relative-delay)',
            hasAlpha: true
        },
        'microsoft.traffic.incident.night': {
            name: 'Traffic incident (night)',
            hasAlpha: true
        },
        'microsoft.traffic.incident.s1': {
            name: 'Traffic incident (s1)',
            hasAlpha: true
        },
        'microsoft.traffic.incident.s2': {
            name: 'Traffic incident (s2)',
            hasAlpha: true
        },
        'microsoft.traffic.incident.s3': {
            name: 'Traffic incident (s3)',
            hasAlpha: true
        },
        'microsoft.weather.infrared.main': {
            name: 'Weather (infrared)',
            maxZoom: 15,
            hasAlpha: true
        },
        'microsoft.weather.radar.main': {
            name: 'Weather (radar)',
            maxZoom: 15,
            hasAlpha: true
        }
    },
    AIRBUS_CREDIT: '© DLR 2011-2014 / © Airbus 2021'    
};