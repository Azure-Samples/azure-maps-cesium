/*
azure-maps-cesium Version: 0.0.4

MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE
*/

(function (exports, Cesium) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var adal = createCommonjsModule(function (module) {
    //----------------------------------------------------------------------
    // AdalJS v1.0.18
    // @preserve Copyright (c) Microsoft Open Technologies, Inc.
    // All Rights Reserved
    // Apache License 2.0
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    // http://www.apache.org/licenses/LICENSE-2.0
    //id
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    //----------------------------------------------------------------------

    var AuthenticationContext = (function () {

        /**
         * Configuration options for Authentication Context.
         * @class config
         *  @property {string} tenant - Your target tenant.
         *  @property {string} clientId - Client ID assigned to your app by Azure Active Directory.
         *  @property {string} redirectUri - Endpoint at which you expect to receive tokens.Defaults to `window.location.href`.
         *  @property {string} instance - Azure Active Directory Instance.Defaults to `https://login.microsoftonline.com/`.
         *  @property {Array} endpoints - Collection of {Endpoint-ResourceId} used for automatically attaching tokens in webApi calls.
         *  @property {Boolean} popUp - Set this to true to enable login in a popup winodow instead of a full redirect.Defaults to `false`.
         *  @property {string} localLoginUrl - Set this to redirect the user to a custom login page.
         *  @property {function} displayCall - User defined function of handling the navigation to Azure AD authorization endpoint in case of login. Defaults to 'null'.
         *  @property {string} postLogoutRedirectUri - Redirects the user to postLogoutRedirectUri after logout. Defaults is 'redirectUri'.
         *  @property {string} cacheLocation - Sets browser storage to either 'localStorage' or sessionStorage'. Defaults to 'sessionStorage'.
         *  @property {Array.<string>} anonymousEndpoints Array of keywords or URI's. Adal will not attach a token to outgoing requests that have these keywords or uri. Defaults to 'null'.
         *  @property {number} expireOffsetSeconds If the cached token is about to be expired in the expireOffsetSeconds (in seconds), Adal will renew the token instead of using the cached token. Defaults to 300 seconds.
         *  @property {string} correlationId Unique identifier used to map the request with the response. Defaults to RFC4122 version 4 guid (128 bits).
         *  @property {number} loadFrameTimeout The number of milliseconds of inactivity before a token renewal response from AAD should be considered timed out.
         */

        /**
         * Creates a new AuthenticationContext object.
         * @constructor
         * @param {config}  config               Configuration options for AuthenticationContext
         */

        AuthenticationContext = function (config) {
            /**
             * Enum for request type
             * @enum {string}
             */
            this.REQUEST_TYPE = {
                LOGIN: 'LOGIN',
                RENEW_TOKEN: 'RENEW_TOKEN',
                UNKNOWN: 'UNKNOWN'
            };

            this.RESPONSE_TYPE = {
                ID_TOKEN_TOKEN: 'id_token token',
                TOKEN: 'token'
            };

            /**
             * Enum for storage constants
             * @enum {string}
             */
            this.CONSTANTS = {
                ACCESS_TOKEN: 'access_token',
                EXPIRES_IN: 'expires_in',
                ID_TOKEN: 'id_token',
                ERROR_DESCRIPTION: 'error_description',
                SESSION_STATE: 'session_state',
                ERROR: 'error',
                STORAGE: {
                    TOKEN_KEYS: 'adal.token.keys',
                    ACCESS_TOKEN_KEY: 'adal.access.token.key',
                    EXPIRATION_KEY: 'adal.expiration.key',
                    STATE_LOGIN: 'adal.state.login',
                    STATE_RENEW: 'adal.state.renew',
                    NONCE_IDTOKEN: 'adal.nonce.idtoken',
                    SESSION_STATE: 'adal.session.state',
                    USERNAME: 'adal.username',
                    IDTOKEN: 'adal.idtoken',
                    ERROR: 'adal.error',
                    ERROR_DESCRIPTION: 'adal.error.description',
                    LOGIN_REQUEST: 'adal.login.request',
                    LOGIN_ERROR: 'adal.login.error',
                    RENEW_STATUS: 'adal.token.renew.status',
                    ANGULAR_LOGIN_REQUEST: 'adal.angular.login.request'
                },
                RESOURCE_DELIMETER: '|',
                CACHE_DELIMETER: '||',
                LOADFRAME_TIMEOUT: 6000,
                TOKEN_RENEW_STATUS_CANCELED: 'Canceled',
                TOKEN_RENEW_STATUS_COMPLETED: 'Completed',
                TOKEN_RENEW_STATUS_IN_PROGRESS: 'In Progress',
                LOGGING_LEVEL: {
                    ERROR: 0,
                    WARN: 1,
                    INFO: 2,
                    VERBOSE: 3
                },
                LEVEL_STRING_MAP: {
                    0: 'ERROR:',
                    1: 'WARNING:',
                    2: 'INFO:',
                    3: 'VERBOSE:'
                },
                POPUP_WIDTH: 483,
                POPUP_HEIGHT: 600
            };

            if (AuthenticationContext.prototype._singletonInstance) {
                return AuthenticationContext.prototype._singletonInstance;
            }
            AuthenticationContext.prototype._singletonInstance = this;

            // public
            this.instance = 'https://login.microsoftonline.com/';
            this.config = {};
            this.callback = null;
            this.popUp = false;
            this.isAngular = false;

            // private
            this._user = null;
            this._activeRenewals = {};
            this._loginInProgress = false;
            this._acquireTokenInProgress = false;
            this._renewStates = [];
            this._callBackMappedToRenewStates = {};
            this._callBacksMappedToRenewStates = {};
            this._openedWindows = [];
            this._requestType = this.REQUEST_TYPE.LOGIN;
            window._adalInstance = this;

            // validate before constructor assignments
            if (config.displayCall && typeof config.displayCall !== 'function') {
                throw new Error('displayCall is not a function');
            }

            if (!config.clientId) {
                throw new Error('clientId is required');
            }

            this.config = this._cloneConfig(config);

            if (this.config.navigateToLoginRequestUrl === undefined)
                this.config.navigateToLoginRequestUrl = true;

            if (this.config.popUp)
                this.popUp = true;

            if (this.config.callback && typeof this.config.callback === 'function')
                this.callback = this.config.callback;

            if (this.config.instance) {
                this.instance = this.config.instance;
            }

            // App can request idtoken for itself using clientid as resource
            if (!this.config.loginResource) {
                this.config.loginResource = this.config.clientId;
            }

            // redirect and logout_redirect are set to current location by default
            if (!this.config.redirectUri) {
                // strip off query parameters or hashes from the redirect uri as AAD does not allow those.
                this.config.redirectUri = window.location.href.split("?")[0].split("#")[0];
            }

            if (!this.config.postLogoutRedirectUri) {
                // strip off query parameters or hashes from the post logout redirect uri as AAD does not allow those.
                this.config.postLogoutRedirectUri = window.location.href.split("?")[0].split("#")[0];
            }

            if (!this.config.anonymousEndpoints) {
                this.config.anonymousEndpoints = [];
            }

            if (this.config.isAngular) {
                this.isAngular = this.config.isAngular;
            }

            if (this.config.loadFrameTimeout) {
                this.CONSTANTS.LOADFRAME_TIMEOUT = this.config.loadFrameTimeout;
            }
        };

        if (typeof window !== 'undefined') {
            window.Logging = {
                piiLoggingEnabled: false,
                level: 0,
                log: function (message) { }
            };
        }

        /**
         * Initiates the login process by redirecting the user to Azure AD authorization endpoint.
         */
        AuthenticationContext.prototype.login = function () {
            if (this._loginInProgress) {
                this.info("Login in progress");
                return;
            }

            this._loginInProgress = true;

            // Token is not present and user needs to login
            var expectedState = this._guid();
            this.config.state = expectedState;
            this._idTokenNonce = this._guid();
            var loginStartPage = this._getItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST);

            if (!loginStartPage || loginStartPage === "") {
                loginStartPage = window.location.href;
            }
            else {
                this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST, "");
            }

            this.verbose('Expected state: ' + expectedState + ' startPage:' + loginStartPage);
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, loginStartPage);
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, expectedState, true);
            this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
            var urlNavigate = this._getNavigateUrl('id_token', null) + '&nonce=' + encodeURIComponent(this._idTokenNonce);

            if (this.config.displayCall) {
                // User defined way of handling the navigation
                this.config.displayCall(urlNavigate);
            }
            else if (this.popUp) {
                this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');// so requestInfo does not match redirect case
                this._renewStates.push(expectedState);
                this.registerCallback(expectedState, this.config.clientId, this.callback);
                this._loginPopup(urlNavigate);
            }
            else {
                this.promptUser(urlNavigate);
            }
        };

        /**
         * Configures popup window for login.
         * @ignore
         */
        AuthenticationContext.prototype._openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
            try {
                /**
                * adding winLeft and winTop to account for dual monitor
                * using screenLeft and screenTop for IE8 and earlier
                */
                var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
                var winTop = window.screenTop ? window.screenTop : window.screenY;
                /**
                * window.innerWidth displays browser window's height and width excluding toolbars
                * using document.documentElement.clientWidth for IE8 and earlier
                */
                var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var left = ((width / 2) - (popUpWidth / 2)) + winLeft;
                var top = ((height / 2) - (popUpHeight / 2)) + winTop;

                var popupWindow = window.open(urlNavigate, title, 'width=' + popUpWidth + ', height=' + popUpHeight + ', top=' + top + ', left=' + left);

                if (popupWindow.focus) {
                    popupWindow.focus();
                }

                return popupWindow;
            } catch (e) {
                this.warn('Error opening popup, ' + e.message);
                this._loginInProgress = false;
                this._acquireTokenInProgress = false;
                return null;
            }
        };

        AuthenticationContext.prototype._handlePopupError = function (loginCallback, resource, error, errorDesc, loginError) {
            this.warn(errorDesc);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, error);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, errorDesc);
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, loginError);

            if (resource && this._activeRenewals[resource]) {
                this._activeRenewals[resource] = null;
            }

            this._loginInProgress = false;
            this._acquireTokenInProgress = false;

            if (loginCallback) {
                loginCallback(errorDesc, null, error);
            }
        };

        /**
         * After authorization, the user will be sent to your specified redirect_uri with the user's bearer token
         * attached to the URI fragment as an id_token field. It closes popup window after redirection.
         * @ignore
         */
        AuthenticationContext.prototype._loginPopup = function (urlNavigate, resource, callback) {
            var popupWindow = this._openPopup(urlNavigate, "login", this.CONSTANTS.POPUP_WIDTH, this.CONSTANTS.POPUP_HEIGHT);
            var loginCallback = callback || this.callback;

            if (popupWindow == null) {
                var error = 'Error opening popup';
                var errorDesc = 'Popup Window is null. This can happen if you are using IE';
                this._handlePopupError(loginCallback, resource, error, errorDesc, errorDesc);
                return;
            }

            this._openedWindows.push(popupWindow);

            if (this.config.redirectUri.indexOf('#') != -1) {
                var registeredRedirectUri = this.config.redirectUri.split("#")[0];
            }

            else {
                var registeredRedirectUri = this.config.redirectUri;
            }

            var that = this;

            var pollTimer = window.setInterval(function () {
                if (!popupWindow || popupWindow.closed || popupWindow.closed === undefined) {
                    var error = 'Popup Window closed';
                    var errorDesc = 'Popup Window closed by UI action/ Popup Window handle destroyed due to cross zone navigation in IE/Edge';

                    if (that.isAngular) {
                        that._broadcast('adal:popUpClosed', errorDesc + that.CONSTANTS.RESOURCE_DELIMETER + error);
                    }

                    that._handlePopupError(loginCallback, resource, error, errorDesc, errorDesc);
                    window.clearInterval(pollTimer);
                    return;
                }
                try {
                    var popUpWindowLocation = popupWindow.location;
                    if (encodeURI(popUpWindowLocation.href).indexOf(encodeURI(registeredRedirectUri)) != -1) {
                        if (that.isAngular) {
                            that._broadcast('adal:popUpHashChanged', popUpWindowLocation.hash);
                        }
                        else {
                            that.handleWindowCallback(popUpWindowLocation.hash);
                        }

                        window.clearInterval(pollTimer);
                        that._loginInProgress = false;
                        that._acquireTokenInProgress = false;
                        that.info("Closing popup window");
                        that._openedWindows = [];
                        popupWindow.close();
                        return;
                    }
                } catch (e) {
                }
            }, 1);
        };

        AuthenticationContext.prototype._broadcast = function (eventName, data) {
            // Custom Event is not supported in IE, below IIFE will polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher
            (function () {

                if (typeof window.CustomEvent === "function") {
                    return false;
                }

                function CustomEvent(event, params) {
                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }

                CustomEvent.prototype = window.Event.prototype;
                window.CustomEvent = CustomEvent;
            })();

            var evt = new CustomEvent(eventName, { detail: data });
            window.dispatchEvent(evt);
        };

        AuthenticationContext.prototype.loginInProgress = function () {
            return this._loginInProgress;
        };

        /**
         * Checks for the resource in the cache. By default, cache location is Session Storage
         * @ignore
         * @returns {Boolean} 'true' if login is in progress, else returns 'false'.
         */
        AuthenticationContext.prototype._hasResource = function (key) {
            var keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);
            return keys && !this._isEmpty(keys) && (keys.indexOf(key + this.CONSTANTS.RESOURCE_DELIMETER) > -1);
        };

        /**
         * Gets token for the specified resource from the cache.
         * @param {string}   resource A URI that identifies the resource for which the token is requested.
         * @returns {string} token if if it exists and not expired, otherwise null.
         */
        AuthenticationContext.prototype.getCachedToken = function (resource) {
            if (!this._hasResource(resource)) {
                return null;
            }

            var token = this._getItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource);
            var expiry = this._getItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource);

            // If expiration is within offset, it will force renew
            var offset = this.config.expireOffsetSeconds || 300;

            if (expiry && (expiry > this._now() + offset)) {
                return token;
            } else {
                this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, '');
                this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, 0);
                return null;
            }
        };

        /**
        * User information from idtoken.
        *  @class User
        *  @property {string} userName - username assigned from upn or email.
        *  @property {object} profile - properties parsed from idtoken.
        */

        /**
         * If user object exists, returns it. Else creates a new user object by decoding id_token from the cache.
         * @returns {User} user object
         */
        AuthenticationContext.prototype.getCachedUser = function () {
            if (this._user) {
                return this._user;
            }

            var idtoken = this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);
            this._user = this._createUser(idtoken);
            return this._user;
        };

        /**
         * Adds the passed callback to the array of callbacks for the specified resource and puts the array on the window object. 
         * @param {string}   resource A URI that identifies the resource for which the token is requested.
         * @param {string}   expectedState A unique identifier (guid).
         * @param {tokenCallback} callback - The callback provided by the caller. It will be called with token or error.
         */
        AuthenticationContext.prototype.registerCallback = function (expectedState, resource, callback) {
            this._activeRenewals[resource] = expectedState;

            if (!this._callBacksMappedToRenewStates[expectedState]) {
                this._callBacksMappedToRenewStates[expectedState] = [];
            }

            var self = this;
            this._callBacksMappedToRenewStates[expectedState].push(callback);

            if (!this._callBackMappedToRenewStates[expectedState]) {
                this._callBackMappedToRenewStates[expectedState] = function (errorDesc, token, error, tokenType) {
                    self._activeRenewals[resource] = null;

                    for (var i = 0; i < self._callBacksMappedToRenewStates[expectedState].length; ++i) {
                        try {
                            self._callBacksMappedToRenewStates[expectedState][i](errorDesc, token, error, tokenType);
                        }
                        catch (error) {
                            self.warn(error);
                        }
                    }

                    self._callBacksMappedToRenewStates[expectedState] = null;
                    self._callBackMappedToRenewStates[expectedState] = null;
                };
            }
        };

        // var errorResponse = {error:'', error_description:''};
        // var token = 'string token';
        // callback(errorResponse, token)
        // with callback
        /**
         * Acquires access token with hidden iframe
         * @ignore
         */
        AuthenticationContext.prototype._renewToken = function (resource, callback, responseType) {
            // use iframe to try to renew token
            // use given resource to create new authz url
            this.info('renewToken is called for resource:' + resource);
            var frameHandle = this._addAdalFrame('adalRenewFrame' + resource);
            var expectedState = this._guid() + '|' + resource;
            this.config.state = expectedState;
            // renew happens in iframe, so it keeps javascript context
            this._renewStates.push(expectedState);
            this.verbose('Renew token Expected state: ' + expectedState);
            // remove the existing prompt=... query parameter and add prompt=none
            responseType = responseType || 'token';
            var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl(responseType, resource), 'prompt');

            if (responseType === this.RESPONSE_TYPE.ID_TOKEN_TOKEN) {
                this._idTokenNonce = this._guid();
                this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
                urlNavigate += '&nonce=' + encodeURIComponent(this._idTokenNonce);
            }

            urlNavigate = urlNavigate + '&prompt=none';
            urlNavigate = this._addHintParameters(urlNavigate);
            this.registerCallback(expectedState, resource, callback);
            this.verbosePii('Navigate to:' + urlNavigate);
            frameHandle.src = 'about:blank';
            this._loadFrameTimeout(urlNavigate, 'adalRenewFrame' + resource, resource);

        };

        /**
         * Renews idtoken for app's own backend when resource is clientId and calls the callback with token/error
         * @ignore
         */
        AuthenticationContext.prototype._renewIdToken = function (callback, responseType) {
            // use iframe to try to renew token
            this.info('renewIdToken is called');
            var frameHandle = this._addAdalFrame('adalIdTokenFrame');
            var expectedState = this._guid() + '|' + this.config.clientId;
            this._idTokenNonce = this._guid();
            this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
            this.config.state = expectedState;
            // renew happens in iframe, so it keeps javascript context
            this._renewStates.push(expectedState);
            this.verbose('Renew Idtoken Expected state: ' + expectedState);
            // remove the existing prompt=... query parameter and add prompt=none
            var resource = responseType === null || typeof (responseType) === "undefined" ? null : this.config.clientId;
            var responseType = responseType || 'id_token';
            var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl(responseType, resource), 'prompt');
            urlNavigate = urlNavigate + '&prompt=none';
            urlNavigate = this._addHintParameters(urlNavigate);
            urlNavigate += '&nonce=' + encodeURIComponent(this._idTokenNonce);
            this.registerCallback(expectedState, this.config.clientId, callback);
            this.verbosePii('Navigate to:' + urlNavigate);
            frameHandle.src = 'about:blank';
            this._loadFrameTimeout(urlNavigate, 'adalIdTokenFrame', this.config.clientId);
        };

        /**
         * Checks if the authorization endpoint URL contains query string parameters
         * @ignore
         */
        AuthenticationContext.prototype._urlContainsQueryStringParameter = function (name, url) {
            // regex to detect pattern of a ? or & followed by the name parameter and an equals character
            var regex = new RegExp("[\\?&]" + name + "=");
            return regex.test(url);
        };

        /**
         * Removes the query string parameter from the authorization endpoint URL if it exists
         * @ignore
         */
        AuthenticationContext.prototype._urlRemoveQueryStringParameter = function (url, name) {
            // we remove &name=value, name=value& and name=value
            // &name=value
            var regex = new RegExp('(\\&' + name + '=)[^\&]+');
            url = url.replace(regex, '');
            // name=value&
            regex = new RegExp('(' + name + '=)[^\&]+&');
            url = url.replace(regex, '');
            // name=value
            regex = new RegExp('(' + name + '=)[^\&]+');
            url = url.replace(regex, '');
            return url;
        };

        // Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left
        // registered when network errors occur and subsequent token requests for same resource are registered to the pending request
        /**
         * @ignore
         */
        AuthenticationContext.prototype._loadFrameTimeout = function (urlNavigation, frameName, resource) {
            //set iframe session to pending
            this.verbose('Set loading state to pending for: ' + resource);
            this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS + resource, this.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS);
            this._loadFrame(urlNavigation, frameName);
            var self = this;

            setTimeout(function () {
                if (self._getItem(self.CONSTANTS.STORAGE.RENEW_STATUS + resource) === self.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS) {
                    // fail the iframe session if it's in pending state
                    self.verbose('Loading frame has timed out after: ' + (self.CONSTANTS.LOADFRAME_TIMEOUT / 1000) + ' seconds for resource ' + resource);
                    var expectedState = self._activeRenewals[resource];

                    if (expectedState && self._callBackMappedToRenewStates[expectedState]) {
                        self._callBackMappedToRenewStates[expectedState]('Token renewal operation failed due to timeout', null, 'Token Renewal Failed');
                    }

                    self._saveItem(self.CONSTANTS.STORAGE.RENEW_STATUS + resource, self.CONSTANTS.TOKEN_RENEW_STATUS_CANCELED);
                }
            }, self.CONSTANTS.LOADFRAME_TIMEOUT);
        };

        /**
         * Loads iframe with authorization endpoint URL
         * @ignore
         */
        AuthenticationContext.prototype._loadFrame = function (urlNavigate, frameName) {
            // This trick overcomes iframe navigation in IE
            // IE does not load the page consistently in iframe
            var self = this;
            self.info('LoadFrame: ' + frameName);
            var frameCheck = frameName;
            setTimeout(function () {
                var frameHandle = self._addAdalFrame(frameCheck);

                if (frameHandle.src === '' || frameHandle.src === 'about:blank') {
                    frameHandle.src = urlNavigate;
                    self._loadFrame(urlNavigate, frameCheck);
                }

            }, 500);
        };

        /**
         * @callback tokenCallback
         * @param {string} error_description error description returned from AAD if token request fails.
         * @param {string} token token returned from AAD if token request is successful.
         * @param {string} error error message returned from AAD if token request fails.
         */

        /**
         * Acquires token from the cache if it is not expired. Otherwise sends request to AAD to obtain a new token.
         * @param {string}   resource  ResourceUri identifying the target resource
         * @param {tokenCallback} callback -  The callback provided by the caller. It will be called with token or error.
         */
        AuthenticationContext.prototype.acquireToken = function (resource, callback) {
            if (this._isEmpty(resource)) {
                this.warn('resource is required');
                callback('resource is required', null, 'resource is required');
                return;
            }

            var token = this.getCachedToken(resource);

            if (token) {
                this.info('Token is already in cache for resource:' + resource);
                callback(null, token, null);
                return;
            }

            if (!this._user && !(this.config.extraQueryParameter && this.config.extraQueryParameter.indexOf('login_hint') !== -1)) {
                this.warn('User login is required');
                callback('User login is required', null, 'login required');
                return;
            }

            // renew attempt with iframe
            // Already renewing for this resource, callback when we get the token.
            if (this._activeRenewals[resource]) {
                // Active renewals contains the state for each renewal.
                this.registerCallback(this._activeRenewals[resource], resource, callback);
            }
            else {
                this._requestType = this.REQUEST_TYPE.RENEW_TOKEN;
                if (resource === this.config.clientId) {
                    // App uses idtoken to send to api endpoints
                    // Default resource is tracked as clientid to store this token
                    if (this._user) {
                        this.verbose('renewing idtoken');
                        this._renewIdToken(callback);
                    }
                    else {
                        this.verbose('renewing idtoken and access_token');
                        this._renewIdToken(callback, this.RESPONSE_TYPE.ID_TOKEN_TOKEN);
                    }
                } else {
                    if (this._user) {
                        this.verbose('renewing access_token');
                        this._renewToken(resource, callback);
                    }
                    else {
                        this.verbose('renewing idtoken and access_token');
                        this._renewToken(resource, callback, this.RESPONSE_TYPE.ID_TOKEN_TOKEN);
                    }
                }
            }
        };

        /**
      * Acquires token (interactive flow using a popUp window) by sending request to AAD to obtain a new token.
      * @param {string}   resource  ResourceUri identifying the target resource
      * @param {string}   extraQueryParameters  extraQueryParameters to add to the authentication request
      * @param {tokenCallback} callback -  The callback provided by the caller. It will be called with token or error.
      */
        AuthenticationContext.prototype.acquireTokenPopup = function (resource, extraQueryParameters, claims, callback) {
            if (this._isEmpty(resource)) {
                this.warn('resource is required');
                callback('resource is required', null, 'resource is required');
                return;
            }

            if (!this._user) {
                this.warn('User login is required');
                callback('User login is required', null, 'login required');
                return;
            }

            if (this._acquireTokenInProgress) {
                this.warn("Acquire token interactive is already in progress");
                callback("Acquire token interactive is already in progress", null, "Acquire token interactive is already in progress");
                return;
            }

            var expectedState = this._guid() + '|' + resource;
            this.config.state = expectedState;
            this._renewStates.push(expectedState);
            this._requestType = this.REQUEST_TYPE.RENEW_TOKEN;
            this.verbose('Renew token Expected state: ' + expectedState);
            // remove the existing prompt=... query parameter and add prompt=select_account
            var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl('token', resource), 'prompt');
            urlNavigate = urlNavigate + '&prompt=select_account';

            if (extraQueryParameters) {
                urlNavigate += extraQueryParameters;
            }

            if (claims && (urlNavigate.indexOf("&claims") === -1)) {
                urlNavigate += '&claims=' + encodeURIComponent(claims);
            }
            else if (claims && (urlNavigate.indexOf("&claims") !== -1)) {
                throw new Error('Claims cannot be passed as an extraQueryParameter');
            }

            urlNavigate = this._addHintParameters(urlNavigate);
            this._acquireTokenInProgress = true;
            this.info('acquireToken interactive is called for the resource ' + resource);
            this.registerCallback(expectedState, resource, callback);
            this._loginPopup(urlNavigate, resource, callback);

        };

        /**
          * Acquires token (interactive flow using a redirect) by sending request to AAD to obtain a new token. In this case the callback passed in the Authentication
          * request constructor will be called.
          * @param {string}   resource  ResourceUri identifying the target resource
          * @param {string}   extraQueryParameters  extraQueryParameters to add to the authentication request
          */
        AuthenticationContext.prototype.acquireTokenRedirect = function (resource, extraQueryParameters, claims) {
            if (this._isEmpty(resource)) {
                this.warn('resource is required');
                callback('resource is required', null, 'resource is required');
                return;
            }

            var callback = this.callback;

            if (!this._user) {
                this.warn('User login is required');
                callback('User login is required', null, 'login required');
                return;
            }

            if (this._acquireTokenInProgress) {
                this.warn("Acquire token interactive is already in progress");
                callback("Acquire token interactive is already in progress", null, "Acquire token interactive is already in progress");
                return;
            }

            var expectedState = this._guid() + '|' + resource;
            this.config.state = expectedState;
            this.verbose('Renew token Expected state: ' + expectedState);

            // remove the existing prompt=... query parameter and add prompt=select_account
            var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl('token', resource), 'prompt');
            urlNavigate = urlNavigate + '&prompt=select_account';
            if (extraQueryParameters) {
                urlNavigate += extraQueryParameters;
            }

            if (claims && (urlNavigate.indexOf("&claims") === -1)) {
                urlNavigate += '&claims=' + encodeURIComponent(claims);
            }
            else if (claims && (urlNavigate.indexOf("&claims") !== -1)) {
                throw new Error('Claims cannot be passed as an extraQueryParameter');
            }

            urlNavigate = this._addHintParameters(urlNavigate);
            this._acquireTokenInProgress = true;
            this.info('acquireToken interactive is called for the resource ' + resource);
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, window.location.href);
            this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, expectedState, true);
            this.promptUser(urlNavigate);
        };
        /**
         * Redirects the browser to Azure AD authorization endpoint.
         * @param {string}   urlNavigate  Url of the authorization endpoint.
         */
        AuthenticationContext.prototype.promptUser = function (urlNavigate) {
            if (urlNavigate) {
                this.infoPii('Navigate to:' + urlNavigate);
                window.location.replace(urlNavigate);
            } else {
                this.info('Navigate url is empty');
            }
        };

        /**
         * Clears cache items.
         */
        AuthenticationContext.prototype.clearCache = function () {
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, '');
            this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST, '');
            this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE, '');
            this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');
            this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, '');
            this._renewStates = [];
            this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, '');
            this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
            var keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);

            if (!this._isEmpty(keys)) {
                keys = keys.split(this.CONSTANTS.RESOURCE_DELIMETER);
                for (var i = 0; i < keys.length && keys[i] !== ""; i++) {
                    this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + keys[i], '');
                    this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + keys[i], 0);
                }
            }

            this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, '');
        };

        /**
         * Clears cache items for a given resource.
         * @param {string}  resource a URI that identifies the resource.
         */
        AuthenticationContext.prototype.clearCacheForResource = function (resource) {
            this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

            if (this._hasResource(resource)) {
                this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, '');
                this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, 0);
            }
        };

        /**
         * Redirects user to logout endpoint.
         * After logout, it will redirect to postLogoutRedirectUri if added as a property on the config object.
         */
        AuthenticationContext.prototype.logOut = function () {
            this.clearCache();
            this._user = null;
            var urlNavigate;

            if (this.config.logOutUri) {
                urlNavigate = this.config.logOutUri;
            } else {
                var tenant = 'common';
                var logout = '';

                if (this.config.tenant) {
                    tenant = this.config.tenant;
                }

                if (this.config.postLogoutRedirectUri) {
                    logout = 'post_logout_redirect_uri=' + encodeURIComponent(this.config.postLogoutRedirectUri);
                }

                urlNavigate = this.instance + tenant + '/oauth2/logout?' + logout;
            }

            this.infoPii('Logout navigate to: ' + urlNavigate);
            this.promptUser(urlNavigate);
        };

        AuthenticationContext.prototype._isEmpty = function (str) {
            return (typeof str === 'undefined' || !str || 0 === str.length);
        };

        /**
         * @callback userCallback
         * @param {string} error error message if user info is not available.
         * @param {User} user user object retrieved from the cache.
         */

        /**
         * Calls the passed in callback with the user object or error message related to the user.
         * @param {userCallback} callback - The callback provided by the caller. It will be called with user or error.
         */
        AuthenticationContext.prototype.getUser = function (callback) {
            // IDToken is first call
            if (typeof callback !== 'function') {
                throw new Error('callback is not a function');
            }

            // user in memory
            if (this._user) {
                callback(null, this._user);
                return;
            }

            // frame is used to get idtoken
            var idtoken = this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);

            if (!this._isEmpty(idtoken)) {
                this.info('User exists in cache: ');
                this._user = this._createUser(idtoken);
                callback(null, this._user);
            } else {
                this.warn('User information is not available');
                callback('User information is not available', null);
            }
        };

        /**
         * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time.
         * domain_hint can be one of users/organisations which when added skips the email based discovery process of the user.
         * @ignore
         */
        AuthenticationContext.prototype._addHintParameters = function (urlNavigate) {
            //If you don�t use prompt=none, then if the session does not exist, there will be a failure.
            //If sid is sent alongside domain or login hints, there will be a failure since request is ambiguous.
            //If sid is sent with a prompt value other than none or attempt_none, there will be a failure since the request is ambiguous.

            if (this._user && this._user.profile) {
                if (this._user.profile.sid && urlNavigate.indexOf('&prompt=none') !== -1) {
                    // don't add sid twice if user provided it in the extraQueryParameter value
                    if (!this._urlContainsQueryStringParameter("sid", urlNavigate)) {
                        // add sid
                        urlNavigate += '&sid=' + encodeURIComponent(this._user.profile.sid);
                    }
                }
                else if (this._user.profile.upn) {
                    // don't add login_hint twice if user provided it in the extraQueryParameter value
                    if (!this._urlContainsQueryStringParameter("login_hint", urlNavigate)) {
                        // add login_hint
                        urlNavigate += '&login_hint=' + encodeURIComponent(this._user.profile.upn);
                    }
                    // don't add domain_hint twice if user provided it in the extraQueryParameter value
                    if (!this._urlContainsQueryStringParameter("domain_hint", urlNavigate) && this._user.profile.upn.indexOf('@') > -1) {
                        var parts = this._user.profile.upn.split('@');
                        // local part can include @ in quotes. Sending last part handles that.
                        urlNavigate += '&domain_hint=' + encodeURIComponent(parts[parts.length - 1]);
                    }
                }

            }

            return urlNavigate;
        };

        /**
         * Creates a user object by decoding the id_token
         * @ignore
         */
        AuthenticationContext.prototype._createUser = function (idToken) {
            var user = null;
            var parsedJson = this._extractIdToken(idToken);
            if (parsedJson && parsedJson.hasOwnProperty('aud')) {
                if (parsedJson.aud.toLowerCase() === this.config.clientId.toLowerCase()) {

                    user = {
                        userName: '',
                        profile: parsedJson
                    };

                    if (parsedJson.hasOwnProperty('upn')) {
                        user.userName = parsedJson.upn;
                    } else if (parsedJson.hasOwnProperty('email')) {
                        user.userName = parsedJson.email;
                    }
                } else {
                    this.warn('IdToken has invalid aud field');
                }

            }

            return user;
        };

        /**
         * Returns the anchor part(#) of the URL
         * @ignore
         */
        AuthenticationContext.prototype._getHash = function (hash) {
            if (hash.indexOf('#/') > -1) {
                hash = hash.substring(hash.indexOf('#/') + 2);
            } else if (hash.indexOf('#') > -1) {
                hash = hash.substring(1);
            }

            return hash;
        };

        /**
         * Checks if the URL fragment contains access token, id token or error_description.
         * @param {string} hash  -  Hash passed from redirect page
         * @returns {Boolean} true if response contains id_token, access_token or error, false otherwise.
         */
        AuthenticationContext.prototype.isCallback = function (hash) {
            hash = this._getHash(hash);
            var parameters = this._deserialize(hash);
            return (
                parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION) ||
                parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN) ||
                parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)
            );
        };

        /**
         * Gets login error
         * @returns {string} error message related to login.
         */
        AuthenticationContext.prototype.getLoginError = function () {
            return this._getItem(this.CONSTANTS.STORAGE.LOGIN_ERROR);
        };

        /**
         * Request info object created from the response received from AAD.
         *  @class RequestInfo
         *  @property {object} parameters - object comprising of fields such as id_token/error, session_state, state, e.t.c.
         *  @property {REQUEST_TYPE} requestType - either LOGIN, RENEW_TOKEN or UNKNOWN.
         *  @property {boolean} stateMatch - true if state is valid, false otherwise.
         *  @property {string} stateResponse - unique guid used to match the response with the request.
         *  @property {boolean} valid - true if requestType contains id_token, access_token or error, false otherwise.
         */

        /**
         * Creates a requestInfo object from the URL fragment and returns it.
         * @returns {RequestInfo} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
         */
        AuthenticationContext.prototype.getRequestInfo = function (hash) {
            hash = this._getHash(hash);
            var parameters = this._deserialize(hash);
            var requestInfo = {
                valid: false,
                parameters: {},
                stateMatch: false,
                stateResponse: '',
                requestType: this.REQUEST_TYPE.UNKNOWN,
            };

            if (parameters) {
                requestInfo.parameters = parameters;
                if (parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION) ||
                    parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN) ||
                    parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)) {

                    requestInfo.valid = true;

                    // which call
                    var stateResponse = '';
                    if (parameters.hasOwnProperty('state')) {
                        this.verbose('State: ' + parameters.state);
                        stateResponse = parameters.state;
                    } else {
                        this.warn('No state returned');
                        return requestInfo;
                    }

                    requestInfo.stateResponse = stateResponse;

                    // async calls can fire iframe and login request at the same time if developer does not use the API as expected
                    // incoming callback needs to be looked up to find the request type
                    if (this._matchState(requestInfo)) { // loginRedirect or acquireTokenRedirect
                        return requestInfo;
                    }

                    // external api requests may have many renewtoken requests for different resource
                    if (!requestInfo.stateMatch && window.parent) {
                        requestInfo.requestType = this._requestType;
                        var statesInParentContext = this._renewStates;
                        for (var i = 0; i < statesInParentContext.length; i++) {
                            if (statesInParentContext[i] === requestInfo.stateResponse) {
                                requestInfo.stateMatch = true;
                                break;
                            }
                        }
                    }
                }
            }
            return requestInfo;
        };

        /**
        * Matches nonce from the request with the response.
        * @ignore
        */
        AuthenticationContext.prototype._matchNonce = function (user) {
            var requestNonce = this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN);

            if (requestNonce) {
                requestNonce = requestNonce.split(this.CONSTANTS.CACHE_DELIMETER);
                for (var i = 0; i < requestNonce.length; i++) {
                    if (requestNonce[i] && requestNonce[i] === user.profile.nonce) {
                        return true;
                    }
                }
            }

            return false;
        };

        /**
        * Matches state from the request with the response.
        * @ignore
        */
        AuthenticationContext.prototype._matchState = function (requestInfo) {
            var loginStates = this._getItem(this.CONSTANTS.STORAGE.STATE_LOGIN);

            if (loginStates) {
                loginStates = loginStates.split(this.CONSTANTS.CACHE_DELIMETER);
                for (var i = 0; i < loginStates.length; i++) {
                    if (loginStates[i] && loginStates[i] === requestInfo.stateResponse) {
                        requestInfo.requestType = this.REQUEST_TYPE.LOGIN;
                        requestInfo.stateMatch = true;
                        return true;
                    }
                }
            }

            var acquireTokenStates = this._getItem(this.CONSTANTS.STORAGE.STATE_RENEW);

            if (acquireTokenStates) {
                acquireTokenStates = acquireTokenStates.split(this.CONSTANTS.CACHE_DELIMETER);
                for (var i = 0; i < acquireTokenStates.length; i++) {
                    if (acquireTokenStates[i] && acquireTokenStates[i] === requestInfo.stateResponse) {
                        requestInfo.requestType = this.REQUEST_TYPE.RENEW_TOKEN;
                        requestInfo.stateMatch = true;
                        return true;
                    }
                }
            }

            return false;

        };

        /**
         * Extracts resource value from state.
         * @ignore
         */
        AuthenticationContext.prototype._getResourceFromState = function (state) {
            if (state) {
                var splitIndex = state.indexOf('|');

                if (splitIndex > -1 && splitIndex + 1 < state.length) {
                    return state.substring(splitIndex + 1);
                }
            }

            return '';
        };

        /**
         * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the user object.
         */
        AuthenticationContext.prototype.saveTokenFromHash = function (requestInfo) {
            this.info('State status:' + requestInfo.stateMatch + '; Request type:' + requestInfo.requestType);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

            var resource = this._getResourceFromState(requestInfo.stateResponse);

            // Record error
            if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION)) {
                this.infoPii('Error :' + requestInfo.parameters.error + '; Error description:' + requestInfo.parameters[this.CONSTANTS.ERROR_DESCRIPTION]);
                this._saveItem(this.CONSTANTS.STORAGE.ERROR, requestInfo.parameters.error);
                this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, requestInfo.parameters[this.CONSTANTS.ERROR_DESCRIPTION]);

                if (requestInfo.requestType === this.REQUEST_TYPE.LOGIN) {
                    this._loginInProgress = false;
                    this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, requestInfo.parameters.error_description);
                }
            } else {
                // It must verify the state from redirect
                if (requestInfo.stateMatch) {
                    // record tokens to storage if exists
                    this.info('State is right');
                    if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.SESSION_STATE)) {
                        this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE, requestInfo.parameters[this.CONSTANTS.SESSION_STATE]);
                    }

                    var keys;

                    if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN)) {
                        this.info('Fragment has access token');

                        if (!this._hasResource(resource)) {
                            keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS) || '';
                            this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, keys + resource + this.CONSTANTS.RESOURCE_DELIMETER);
                        }

                        // save token with related resource
                        this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, requestInfo.parameters[this.CONSTANTS.ACCESS_TOKEN]);
                        this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, this._expiresIn(requestInfo.parameters[this.CONSTANTS.EXPIRES_IN]));
                    }

                    if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)) {
                        this.info('Fragment has id token');
                        this._loginInProgress = false;
                        this._user = this._createUser(requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                        if (this._user && this._user.profile) {
                            if (!this._matchNonce(this._user)) {
                                this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, 'Nonce received: ' + this._user.profile.nonce + ' is not same as requested: ' +
                                    this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN));
                                this._user = null;
                            } else {
                                this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN, requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);

                                // Save idtoken as access token for app itself
                                resource = this.config.loginResource ? this.config.loginResource : this.config.clientId;

                                if (!this._hasResource(resource)) {
                                    keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS) || '';
                                    this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, keys + resource + this.CONSTANTS.RESOURCE_DELIMETER);
                                }

                                this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                                this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, this._user.profile.exp);
                            }
                        }
                        else {
                            requestInfo.parameters['error'] = 'invalid id_token';
                            requestInfo.parameters['error_description'] = 'Invalid id_token. id_token: ' + requestInfo.parameters[this.CONSTANTS.ID_TOKEN];
                            this._saveItem(this.CONSTANTS.STORAGE.ERROR, 'invalid id_token');
                            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, 'Invalid id_token. id_token: ' + requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                        }
                    }
                } else {
                    requestInfo.parameters['error'] = 'Invalid_state';
                    requestInfo.parameters['error_description'] = 'Invalid_state. state: ' + requestInfo.stateResponse;
                    this._saveItem(this.CONSTANTS.STORAGE.ERROR, 'Invalid_state');
                    this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, 'Invalid_state. state: ' + requestInfo.stateResponse);
                }
            }

            this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS + resource, this.CONSTANTS.TOKEN_RENEW_STATUS_COMPLETED);
        };

        /**
         * Gets resource for given endpoint if mapping is provided with config.
         * @param {string} endpoint  -  The URI for which the resource Id is requested.
         * @returns {string} resource for this API endpoint.
         */
        AuthenticationContext.prototype.getResourceForEndpoint = function (endpoint) {

            // if user specified list of anonymous endpoints, no need to send token to these endpoints, return null.
            if (this.config && this.config.anonymousEndpoints) {
                for (var i = 0; i < this.config.anonymousEndpoints.length; i++) {
                    if (endpoint.indexOf(this.config.anonymousEndpoints[i]) > -1) {
                        return null;
                    }
                }
            }

            if (this.config && this.config.endpoints) {
                for (var configEndpoint in this.config.endpoints) {
                    // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1
                    if (endpoint.indexOf(configEndpoint) > -1) {
                        return this.config.endpoints[configEndpoint];
                    }
                }
            }

            // default resource will be clientid if nothing specified
            // App will use idtoken for calls to itself
            // check if it's staring from http or https, needs to match with app host
            if (endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
                if (this._getHostFromUri(endpoint) === this._getHostFromUri(this.config.redirectUri)) {
                    return this.config.loginResource;
                }
            }
            else {
                // in angular level, the url for $http interceptor call could be relative url,
                // if it's relative call, we'll treat it as app backend call.            
                return this.config.loginResource;
            }

            // if not the app's own backend or not a domain listed in the endpoints structure
            return null;
        };

        /**
         * Strips the protocol part of the URL and returns it.
         * @ignore
         */
        AuthenticationContext.prototype._getHostFromUri = function (uri) {
            // remove http:// or https:// from uri
            var extractedUri = String(uri).replace(/^(https?:)\/\//, '');
            extractedUri = extractedUri.split('/')[0];
            return extractedUri;
        };

        /**
         * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
         * @param {string} [hash=window.location.hash] - Hash fragment of Url.
         */
        AuthenticationContext.prototype.handleWindowCallback = function (hash) {
            // This is for regular javascript usage for redirect handling
            // need to make sure this is for callback
            if (hash == null) {
                hash = window.location.hash;
            }

            if (this.isCallback(hash)) {
                var self = null;
                var isPopup = false;

                if (this._openedWindows.length > 0 && this._openedWindows[this._openedWindows.length - 1].opener
                    && this._openedWindows[this._openedWindows.length - 1].opener._adalInstance) {
                    self = this._openedWindows[this._openedWindows.length - 1].opener._adalInstance;
                    isPopup = true;
                }
                else if (window.parent && window.parent._adalInstance) {
                    self = window.parent._adalInstance;
                }

                var requestInfo = self.getRequestInfo(hash);
                var token, tokenReceivedCallback, tokenType = null;

                if (isPopup || window.parent !== window) {
                    tokenReceivedCallback = self._callBackMappedToRenewStates[requestInfo.stateResponse];
                }
                else {
                    tokenReceivedCallback = self.callback;
                }

                self.info("Returned from redirect url");
                self.saveTokenFromHash(requestInfo);

                if ((requestInfo.requestType === this.REQUEST_TYPE.RENEW_TOKEN) && window.parent) {
                    if (window.parent !== window) {
                        self.verbose("Window is in iframe, acquiring token silently");
                    } else {
                        self.verbose("acquiring token interactive in progress");
                    }

                    token = requestInfo.parameters[self.CONSTANTS.ACCESS_TOKEN] || requestInfo.parameters[self.CONSTANTS.ID_TOKEN];
                    tokenType = self.CONSTANTS.ACCESS_TOKEN;
                } else if (requestInfo.requestType === this.REQUEST_TYPE.LOGIN) {
                    token = requestInfo.parameters[self.CONSTANTS.ID_TOKEN];
                    tokenType = self.CONSTANTS.ID_TOKEN;
                }

                var errorDesc = requestInfo.parameters[self.CONSTANTS.ERROR_DESCRIPTION];
                var error = requestInfo.parameters[self.CONSTANTS.ERROR];
                try {
                    if (tokenReceivedCallback) {
                        tokenReceivedCallback(errorDesc, token, error, tokenType);
                    }

                } catch (err) {
                    self.error("Error occurred in user defined callback function: " + err);
                }

                if (window.parent === window && !isPopup) {
                    if (self.config.navigateToLoginRequestUrl) {
                        window.location.href = self._getItem(self.CONSTANTS.STORAGE.LOGIN_REQUEST);
                    } else window.location.hash = '';
                }
            }
        };

        /**
         * Constructs the authorization endpoint URL and returns it.
         * @ignore
         */
        AuthenticationContext.prototype._getNavigateUrl = function (responseType, resource) {
            var tenant = 'common';
            if (this.config.tenant) {
                tenant = this.config.tenant;
            }

            var urlNavigate = this.instance + tenant + '/oauth2/authorize' + this._serialize(responseType, this.config, resource) + this._addLibMetadata();
            this.info('Navigate url:' + urlNavigate);
            return urlNavigate;
        };

        /**
         * Returns the decoded id_token.
         * @ignore
         */
        AuthenticationContext.prototype._extractIdToken = function (encodedIdToken) {
            // id token will be decoded to get the username
            var decodedToken = this._decodeJwt(encodedIdToken);

            if (!decodedToken) {
                return null;
            }

            try {
                var base64IdToken = decodedToken.JWSPayload;
                var base64Decoded = this._base64DecodeStringUrlSafe(base64IdToken);

                if (!base64Decoded) {
                    this.info('The returned id_token could not be base64 url safe decoded.');
                    return null;
                }

                // ECMA script has JSON built-in support
                return JSON.parse(base64Decoded);
            } catch (err) {
                this.error('The returned id_token could not be decoded', err);
            }

            return null;
        };

        /**
         * Decodes a string of data which has been encoded using base-64 encoding.
         * @ignore
         */
        AuthenticationContext.prototype._base64DecodeStringUrlSafe = function (base64IdToken) {
            // html5 should support atob function for decoding
            base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');

            if (window.atob) {
                return decodeURIComponent(escape(window.atob(base64IdToken))); // jshint ignore:line
            }
            else {
                return decodeURIComponent(escape(this._decode(base64IdToken)));
            }
        };

        //Take https://cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.js and https://en.wikipedia.org/wiki/Base64 as reference. 
        AuthenticationContext.prototype._decode = function (base64IdToken) {
            var codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            base64IdToken = String(base64IdToken).replace(/=+$/, '');

            var length = base64IdToken.length;

            if (length % 4 === 1) {
                throw new Error('The token to be decoded is not correctly encoded.');
            }

            var h1, h2, h3, h4, bits, c1, c2, c3, decoded = '';

            for (var i = 0; i < length; i += 4) {
                //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
                // then 6 bits per base64 encoded character
                h1 = codes.indexOf(base64IdToken.charAt(i));
                h2 = codes.indexOf(base64IdToken.charAt(i + 1));
                h3 = codes.indexOf(base64IdToken.charAt(i + 2));
                h4 = codes.indexOf(base64IdToken.charAt(i + 3));

                // For padding, if last two are '='
                if (i + 2 === length - 1) {
                    bits = h1 << 18 | h2 << 12 | h3 << 6;
                    c1 = bits >> 16 & 255;
                    c2 = bits >> 8 & 255;
                    decoded += String.fromCharCode(c1, c2);
                    break;
                }
                // if last one is '='
                else if (i + 1 === length - 1) {
                    bits = h1 << 18 | h2 << 12;
                    c1 = bits >> 16 & 255;
                    decoded += String.fromCharCode(c1);
                    break;
                }

                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

                // then convert to 3 byte chars
                c1 = bits >> 16 & 255;
                c2 = bits >> 8 & 255;
                c3 = bits & 255;

                decoded += String.fromCharCode(c1, c2, c3);
            }

            return decoded;
        };

        /**
         * Decodes an id token into an object with header, payload and signature fields.
         * @ignore
         */
        // Adal.node js crack function
        AuthenticationContext.prototype._decodeJwt = function (jwtToken) {
            if (this._isEmpty(jwtToken)) {
                return null;
            }
            var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;

            var matches = idTokenPartsRegex.exec(jwtToken);

            if (!matches || matches.length < 4) {
                this.warn('The returned id_token is not parseable.');
                return null;
            }

            var crackedToken = {
                header: matches[1],
                JWSPayload: matches[2],
                JWSSig: matches[3]
            };

            return crackedToken;
        };

        /**
         * Converts string to represent binary data in ASCII string format by translating it into a radix-64 representation and returns it
         * @ignore
         */
        AuthenticationContext.prototype._convertUrlSafeToRegularBase64EncodedString = function (str) {
            return str.replace('-', '+').replace('_', '/');
        };

        /**
         * Serializes the parameters for the authorization endpoint URL and returns the serialized uri string.
         * @ignore
         */
        AuthenticationContext.prototype._serialize = function (responseType, obj, resource) {
            var str = [];

            if (obj !== null) {
                str.push('?response_type=' + responseType);
                str.push('client_id=' + encodeURIComponent(obj.clientId));
                if (resource) {
                    str.push('resource=' + encodeURIComponent(resource));
                }

                str.push('redirect_uri=' + encodeURIComponent(obj.redirectUri));
                str.push('state=' + encodeURIComponent(obj.state));

                if (obj.hasOwnProperty('slice')) {
                    str.push('slice=' + encodeURIComponent(obj.slice));
                }

                if (obj.hasOwnProperty('extraQueryParameter')) {
                    str.push(obj.extraQueryParameter);
                }

                var correlationId = obj.correlationId ? obj.correlationId : this._guid();
                str.push('client-request-id=' + encodeURIComponent(correlationId));
            }

            return str.join('&');
        };

        /**
         * Parses the query string parameters into a key-value pair object.
         * @ignore
         */
        AuthenticationContext.prototype._deserialize = function (query) {
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, ' '));
                },
                obj = {};
            match = search.exec(query);

            while (match) {
                obj[decode(match[1])] = decode(match[2]);
                match = search.exec(query);
            }

            return obj;
        };

        /**
         * Converts decimal value to hex equivalent
         * @ignore
         */
        AuthenticationContext.prototype._decimalToHex = function (number) {
            var hex = number.toString(16);

            while (hex.length < 2) {
                hex = '0' + hex;
            }
            return hex;
        };

        /**
         * Generates RFC4122 version 4 guid (128 bits)
         * @ignore
         */
        /* jshint ignore:start */
        AuthenticationContext.prototype._guid = function () {
            // RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
            // pseudo-random numbers.
            // The algorithm is as follows:
            //     Set the two most significant bits (bits 6 and 7) of the
            //        clock_seq_hi_and_reserved to zero and one, respectively.
            //     Set the four most significant bits (bits 12 through 15) of the
            //        time_hi_and_version field to the 4-bit version number from
            //        Section 4.1.3. Version4
            //     Set all the other bits to randomly (or pseudo-randomly) chosen
            //     values.
            // UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
            // time-low               = 4hexOctet
            // time-mid               = 2hexOctet
            // time-high-and-version  = 2hexOctet
            // clock-seq-and-reserved = hexOctet:
            // clock-seq-low          = hexOctet
            // node                   = 6hexOctet
            // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            // y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
            // y values are 8, 9, A, B
            var cryptoObj = window.crypto || window.msCrypto; // for IE 11
            if (cryptoObj && cryptoObj.getRandomValues) {
                var buffer = new Uint8Array(16);
                cryptoObj.getRandomValues(buffer);
                //buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
                buffer[6] |= 0x40; //buffer[6] | 01000000 will set the 6 bit to 1.
                buffer[6] &= 0x4f; //buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
                //buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
                buffer[8] |= 0x80; //buffer[8] | 10000000 will set the 7 bit to 1.
                buffer[8] &= 0xbf; //buffer[8] & 10111111 will set the 6 bit to 0.
                return this._decimalToHex(buffer[0]) + this._decimalToHex(buffer[1]) + this._decimalToHex(buffer[2]) + this._decimalToHex(buffer[3]) + '-' + this._decimalToHex(buffer[4]) + this._decimalToHex(buffer[5]) + '-' + this._decimalToHex(buffer[6]) + this._decimalToHex(buffer[7]) + '-' +
                    this._decimalToHex(buffer[8]) + this._decimalToHex(buffer[9]) + '-' + this._decimalToHex(buffer[10]) + this._decimalToHex(buffer[11]) + this._decimalToHex(buffer[12]) + this._decimalToHex(buffer[13]) + this._decimalToHex(buffer[14]) + this._decimalToHex(buffer[15]);
            }
            else {
                var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
                var hex = '0123456789abcdef';
                var r = 0;
                var guidResponse = "";
                for (var i = 0; i < 36; i++) {
                    if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                        // each x and y needs to be random
                        r = Math.random() * 16 | 0;
                    }
                    if (guidHolder[i] === 'x') {
                        guidResponse += hex[r];
                    } else if (guidHolder[i] === 'y') {
                        // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                        r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                        r |= 0x8; // set pos 3 to 1 as 1???
                        guidResponse += hex[r];
                    } else {
                        guidResponse += guidHolder[i];
                    }
                }
                return guidResponse;
            }
        };
        /* jshint ignore:end */

        /**
         * Calculates the expires in value in milliseconds for the acquired token
         * @ignore
         */
        AuthenticationContext.prototype._expiresIn = function (expires) {
            // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
            if (!expires) expires = 3599;
            return this._now() + parseInt(expires, 10);
        };

        /**
         * Return the number of milliseconds since 1970/01/01
         * @ignore
         */
        AuthenticationContext.prototype._now = function () {
            return Math.round(new Date().getTime() / 1000.0);
        };

        /**
         * Adds the hidden iframe for silent token renewal
         * @ignore
         */
        AuthenticationContext.prototype._addAdalFrame = function (iframeId) {
            if (typeof iframeId === 'undefined') {
                return;
            }

            this.info('Add adal frame to document:' + iframeId);
            var adalFrame = document.getElementById(iframeId);

            if (!adalFrame) {
                if (document.createElement && document.documentElement &&
                    (window.opera || window.navigator.userAgent.indexOf('MSIE 5.0') === -1)) {
                    var ifr = document.createElement('iframe');
                    ifr.setAttribute('id', iframeId);
                    ifr.setAttribute('aria-hidden', 'true');
                    ifr.style.visibility = 'hidden';
                    ifr.style.position = 'absolute';
                    ifr.style.width = ifr.style.height = ifr.borderWidth = '0px';

                    adalFrame = document.getElementsByTagName('body')[0].appendChild(ifr);
                }
                else if (document.body && document.body.insertAdjacentHTML) {
                    document.body.insertAdjacentHTML('beforeEnd', '<iframe name="' + iframeId + '" id="' + iframeId + '" style="display:none"></iframe>');
                }
                if (window.frames && window.frames[iframeId]) {
                    adalFrame = window.frames[iframeId];
                }
            }

            return adalFrame;
        };

        /**
         * Saves the key-value pair in the cache
         * @ignore
         */
        AuthenticationContext.prototype._saveItem = function (key, obj, preserve) {

            if (this.config && this.config.cacheLocation && this.config.cacheLocation === 'localStorage') {

                if (!this._supportsLocalStorage()) {
                    this.info('Local storage is not supported');
                    return false;
                }

                if (preserve) {
                    var value = this._getItem(key) || '';
                    localStorage.setItem(key, value + obj + this.CONSTANTS.CACHE_DELIMETER);
                }
                else {
                    localStorage.setItem(key, obj);
                }

                return true;
            }

            // Default as session storage
            if (!this._supportsSessionStorage()) {
                this.info('Session storage is not supported');
                return false;
            }

            sessionStorage.setItem(key, obj);
            return true;
        };

        /**
         * Searches the value for the given key in the cache
         * @ignore
         */
        AuthenticationContext.prototype._getItem = function (key) {

            if (this.config && this.config.cacheLocation && this.config.cacheLocation === 'localStorage') {

                if (!this._supportsLocalStorage()) {
                    this.info('Local storage is not supported');
                    return null;
                }

                return localStorage.getItem(key);
            }

            // Default as session storage
            if (!this._supportsSessionStorage()) {
                this.info('Session storage is not supported');
                return null;
            }

            return sessionStorage.getItem(key);
        };

        /**
         * Returns true if browser supports localStorage, false otherwise.
         * @ignore
         */
        AuthenticationContext.prototype._supportsLocalStorage = function () {
            try {
                if (!window.localStorage) return false; // Test availability
                window.localStorage.setItem('storageTest', 'A'); // Try write
                if (window.localStorage.getItem('storageTest') != 'A') return false; // Test read/write
                window.localStorage.removeItem('storageTest'); // Try delete
                if (window.localStorage.getItem('storageTest')) return false; // Test delete
                return true; // Success
            } catch (e) {
                return false;
            }
        };

        /**
         * Returns true if browser supports sessionStorage, false otherwise.
         * @ignore
         */
        AuthenticationContext.prototype._supportsSessionStorage = function () {
            try {
                if (!window.sessionStorage) return false; // Test availability
                window.sessionStorage.setItem('storageTest', 'A'); // Try write
                if (window.sessionStorage.getItem('storageTest') != 'A') return false; // Test read/write
                window.sessionStorage.removeItem('storageTest'); // Try delete
                if (window.sessionStorage.getItem('storageTest')) return false; // Test delete
                return true; // Success
            } catch (e) {
                return false;
            }
        };

        /**
         * Returns a cloned copy of the passed object.
         * @ignore
         */
        AuthenticationContext.prototype._cloneConfig = function (obj) {
            if (null === obj || 'object' !== typeof obj) {
                return obj;
            }

            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = obj[attr];
                }
            }
            return copy;
        };

        /**
         * Adds the library version and returns it.
         * @ignore
         */
        AuthenticationContext.prototype._addLibMetadata = function () {
            // x-client-SKU
            // x-client-Ver
            return '&x-client-SKU=Js&x-client-Ver=' + this._libVersion();
        };

        /**
         * Checks the Logging Level, constructs the Log message and logs it. Users need to implement/override this method to turn on Logging. 
         * @param {number} level  -  Level can be set 0,1,2 and 3 which turns on 'error', 'warning', 'info' or 'verbose' level logging respectively.
         * @param {string} message  -  Message to log.
         * @param {string} error  -  Error to log.
         */
        AuthenticationContext.prototype.log = function (level, message, error, containsPii) {

            if (level <= Logging.level) {

                if (!Logging.piiLoggingEnabled && containsPii)
                    return;

                var timestamp = new Date().toUTCString();
                var formattedMessage = '';

                if (this.config.correlationId)
                    formattedMessage = timestamp + ':' + this.config.correlationId + '-' + this._libVersion() + '-' + this.CONSTANTS.LEVEL_STRING_MAP[level] + ' ' + message;
                else
                    formattedMessage = timestamp + ':' + this._libVersion() + '-' + this.CONSTANTS.LEVEL_STRING_MAP[level] + ' ' + message;

                if (error) {
                    formattedMessage += '\nstack:\n' + error.stack;
                }

                Logging.log(formattedMessage);
            }
        };

        /**
         * Logs messages when Logging Level is set to 0.
         * @param {string} message  -  Message to log.
         * @param {string} error  -  Error to log.
         */
        AuthenticationContext.prototype.error = function (message, error) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR, message, error);
        };

        /**
         * Logs messages when Logging Level is set to 1.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.warn = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.WARN, message, null);
        };

        /**
         * Logs messages when Logging Level is set to 2.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.info = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.INFO, message, null);
        };

        /**
         * Logs messages when Logging Level is set to 3.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.verbose = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE, message, null);
        };

        /**
        * Logs Pii messages when Logging Level is set to 0 and window.piiLoggingEnabled is set to true.
        * @param {string} message  -  Message to log.
        * @param {string} error  -  Error to log.
        */
        AuthenticationContext.prototype.errorPii = function (message, error) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR, message, error, true);
        };

        /**
         * Logs  Pii messages when Logging Level is set to 1 and window.piiLoggingEnabled is set to true.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.warnPii = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.WARN, message, null, true);
        };

        /**
         * Logs messages when Logging Level is set to 2 and window.piiLoggingEnabled is set to true.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.infoPii = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.INFO, message, null, true);
        };

        /**
         * Logs messages when Logging Level is set to 3 and window.piiLoggingEnabled is set to true.
         * @param {string} message  -  Message to log.
         */
        AuthenticationContext.prototype.verbosePii = function (message) {
            this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE, message, null, true);
        };
        /**
         * Returns the library version.
         * @ignore
         */
        AuthenticationContext.prototype._libVersion = function () {
            return '1.0.18';
        };

        /**
         * Returns a reference of Authentication Context as a result of a require call.
         * @ignore
         */
        if ( module.exports) {
            module.exports = AuthenticationContext;
            module.exports.inject = function (conf) {
                return new AuthenticationContext(conf);
            };
        }

        return AuthenticationContext;

    }());
    });
    var adal_1 = adal.inject;

    /**
     * An enumeration used to specify the type of authentication mechanism to use.
     */
    var AuthenticationType;
    (function (AuthenticationType) {
        /**
         * The subscription key authentication mechanism.
         * Literal value `"subscriptionKey"`
         */
        AuthenticationType["subscriptionKey"] = "subscriptionKey";
        /**
         * The AAD implicit grant mechanism. Recommended for pages protected by a sign-in.
         * By default the page will be redirected to the AAD login when the map control initializes.
         * Specify a logged-in `AuthenticationContext` in the `AuthenticationOptions`
         * for greater control over when/how the users signs in.
         * Literal value `"aad"`
         */
        AuthenticationType["aad"] = "aad";
        /**
         * The anonymous authentication mechanism. Recommended for pages.
         * Allows a callback responsible for acquiring an authentication token to be provided.
         * Literal value `"anonymous"`
         */
        AuthenticationType["anonymous"] = "anonymous";
    })(AuthenticationType || (AuthenticationType = {}));

    var Constants = {
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
        RENDERV2_VERSION: '2.1',
        TILESETS: {
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

    var Helpers = /** @class */ (function () {
        function Helpers() {
        }
        /** Generates a unique GUID. */
        Helpers.uuid = function () {
            //@ts-ignore
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
            });
        };
        return Helpers;
    }());

    var SetTimeoutWorkerCode = "onmessage = function (event) {\n    var delay = event.data.time; // milliseconds\n    setTimeout(() => {\n        postMessage({id: event.data.id});\n    }, delay);\n};";
    /** A class that provides a setTimeout function that will work in inactive browser tabs, or during mobile lock screens. */
    var Timers = /** @class */ (function () {
        function Timers() {
        }
        Timers.clearTimeout = function (id) {
            var w = Timers._workerTable[id];
            if (w) {
                w.worker.terminate();
                delete Timers._workerTable[id];
            }
        };
        Timers.setTimeout = function (callback, timeout) {
            var id = Math.round(Math.random() * 1000000000);
            var blob = new Blob([SetTimeoutWorkerCode]);
            var blobURL = window.URL.createObjectURL(blob);
            var worker = new Worker(blobURL);
            worker.addEventListener("message", Timers._receivedSetTimeoutMessage);
            Timers._workerTable[id] = {
                callback: callback,
                worker: worker
            };
            //Start the worker.
            worker.postMessage({ id: id, time: timeout });
            return id;
        };
        Timers._receivedSetTimeoutMessage = function (e) {
            var w = Timers._workerTable[e.data.id];
            if (w) {
                w.callback();
                w.worker.terminate();
                delete Timers._workerTable[e.data.id];
            }
        };
        Timers._workerTable = {};
        return Timers;
    }());

    /**
     * A manager for the map control's authentication.
     * Exposed through the authentication property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    var AuthenticationManager = /** @class */ (function () {
        /**
         * @internal
         */
        function AuthenticationManager(authOptions) {
            var _this = this;
            this._initialized = false;
            /**
             * Triggers the user provided function to fetch the token and stores it.
             * @internal
             */
            this._triggerTokenFetch = function () {
                var self = _this;
                return new Promise(function (resolve, reject) {
                    self.options.getToken(function (token) {
                        try {
                            // Try to get the timeout first as this will guarantee the token is correctly formatted.
                            var timeout = self._getTokenExpiry(token) - Constants.tokenRefreshClockSkew;
                            self._storeAccessToken(token);
                            Timers.clearTimeout(self.tokenTimeOutHandle); // Clear the previous refresh timeout in case it hadn't triggered yet.
                            //@ts-ignore
                            self.tokenTimeOutHandle = Timers.setTimeout(self._triggerTokenFetch, timeout);
                            resolve();
                        }
                        catch (_a) {
                            reject(new Error("Invalid token returned by getToken function"));
                        }
                    }, function (error) {
                        reject(error);
                    });
                });
            };
            this.options = authOptions;
        }
        AuthenticationManager.getInstance = function (authOptions) {
            if (authOptions && authOptions.authType) {
                var domain = authOptions.azMapsDomain;
                //Remove any domain that might be in the domain.
                if (domain && /^\w+:\/\//.test(domain)) {
                    // If the provided url includes a protocol don't change it.
                    authOptions.azMapsDomain = domain.replace(/^\w+:\/\//, '');
                }
                if (AuthenticationManager.instance && AuthenticationManager.instance.compareOptions(authOptions)) {
                    return AuthenticationManager.instance;
                }
                var au = new AuthenticationManager(authOptions);
                //Cache the instance for faster processing of additional layers and allow reuse of the same instance.
                if (!AuthenticationManager.instance) {
                    AuthenticationManager.instance = au;
                }
                return au;
            }
            if (AuthenticationManager.instance) {
                return AuthenticationManager.instance;
            }
            throw 'Azure Maps credentials not specified.';
        };
        AuthenticationManager.prototype.compareOptions = function (authOptions) {
            var opt = this.options;
            return authOptions.azMapsDomain === opt.azMapsDomain &&
                authOptions.aadAppId === opt.aadAppId &&
                authOptions.aadInstance === opt.aadInstance &&
                authOptions.aadTenant === opt.aadTenant &&
                authOptions.authType === opt.authType &&
                authOptions.clientId === opt.clientId &&
                authOptions.getToken === opt.getToken &&
                authOptions.subscriptionKey === opt.subscriptionKey;
        };
        AuthenticationManager.prototype.isInitialized = function () {
            return this._initialized;
        };
        /**
         * Initializes the authentication mechanism specified in AuthenticationOptions.
         * If this method has been called before the original initialize promise is returned.
         */
        AuthenticationManager.prototype.initialize = function () {
            var self = this;
            var opt = self.options;
            if (!self.initPromise) {
                // If an init promise hasn't been created this is the first initialize call.
                self.initPromise = new Promise(function (resolve, reject) {
                    if (opt.authType === AuthenticationType.subscriptionKey) {
                        self._initialized = true;
                        resolve();
                    }
                    else if (opt.authType === AuthenticationType.aad) {
                        // If a specific auth context was provided to the map use that.
                        // If not use/create a default auth context shared between maps.
                        opt.authContext = opt.authContext ||
                            AuthenticationManager.getDefaultAuthContext(opt);
                        // If this window is a callback then it is the hidden iframe created by ADAL.
                        // The map doesn't need to finish constructing, so we can dispose it.
                        opt.authContext.handleWindowCallback();
                        if (opt.authContext.getLoginError()) {
                            reject(new Error("Error logging in the AAD users: " +
                                opt.authContext.getLoginError()));
                            return;
                        }
                        if (opt.authContext.isCallback(window.location.hash)) {
                            return;
                        }
                        // Login and acquire a token.
                        // Fire it async so that users can add any listeners for token acquire events first.
                        Timers.setTimeout(function () { return self._loginAndAcquire(resolve, reject); }, 0);
                    }
                    else if (opt.authType === AuthenticationType.anonymous) {
                        // Anonymous authentication, just call the users provided callback.
                        self._initialized = true;
                        resolve(self._triggerTokenFetch());
                    }
                    else {
                        reject(new Error("An invalid authentication type was specified."));
                    }
                });
            }
            return this.initPromise;
        };
        /**
         * Gets the default auth context to be shared between maps without one specified to them.
         */
        AuthenticationManager.getDefaultAuthContext = function (options) {
            var self = this;
            if (!options.aadAppId) {
                throw new Error("No AAD app ID was specified.");
            }
            if (!options.aadTenant) {
                throw new Error("No AAD tenant was specified.");
            }
            // Create a new auth context if one doesn't already exist.
            if (!self.defaultAuthContext) {
                self.defaultAuthContext = new adal({
                    instance: options.aadInstance || 'https://login.windows-ppe.net/',
                    tenant: options.aadTenant,
                    clientId: options.aadAppId,
                    cacheLocation: Constants.preferredCacheLocation
                });
            }
            // Return either a reused auth context or the one created just above.
            return self.defaultAuthContext;
        };
        /**
         * The login callback function, called after user interactive login session is completed
         * @param resolve the resolve callback for the promise created from the initialize call
         */
        AuthenticationManager.prototype._loginAndAcquire = function (resolve, reject) {
            var self = this;
            var opt = self.options;
            var acquireAndResolve = function () {
                // Check that we can acquire a token and then resolve the promise.
                // Reject if an error occurs when acquiring the token.
                opt.authContext.acquireToken(Constants.DEFAULT_DOMAIN, function (error) {
                    if (error) {
                        reject(new Error(error));
                    }
                    else {
                        self._initialized = true;
                        resolve();
                    }
                });
            };
            var cachedToken = opt.authContext.getCachedToken(opt.aadAppId);
            var cachedUser = opt.authContext.getCachedUser();
            if (cachedToken && cachedUser) {
                // If a cached token and user are available we should be able to
                // acquire the access token and then resolve the promise.
                acquireAndResolve();
            }
            else {
                // If a login isn't already in progress start a new one.
                if (!opt.authContext.loginInProgress()) {
                    opt.authContext.login();
                }
                // Poll for when the login done and then use the cached token.
                var loginPoll_1 = setInterval(function () {
                    if (!opt.authContext.loginInProgress()) {
                        // Stop polling for login done.
                        clearInterval(loginPoll_1);
                        if (opt.authContext.getCachedToken(opt.aadAppId)) {
                            // If a token for the specified AAD app id is available we are ready
                            // to acquire the access token and resolve the init promise.
                            acquireAndResolve();
                        }
                        else {
                            // If done logging in but no token for the specified AAD app ID is cached
                            // then there is a mistake in the auth context config.
                            reject(new Error(opt.authContext.getLoginError() ||
                                "The AAD authentication context is not logged-in for the specified app ID: " +
                                    opt.aadAppId));
                        }
                    }
                }, 25);
            }
        };
        /**
         * Returns the current authentication type in use.
         */
        AuthenticationManager.prototype.getAuthType = function () {
            return this.options.authType;
        };
        /**
         * Returns the current client ID in use.
         */
        AuthenticationManager.prototype.getClientId = function () {
            return this.options.clientId;
        };
        /**
         * Returns the access token with an audience URI of https://atlas.microsoft.com.
         */
        AuthenticationManager.prototype.getToken = function () {
            var self = this;
            var opt = self.options;
            if (opt.authType === AuthenticationType.aad) {
                var token_1 = opt.authContext.getCachedToken(Constants.DEFAULT_DOMAIN);
                if (!token_1) {
                    if (!opt.authContext.getCachedUser()) {
                        // Login if a user isn't cached. This shouldn't typically happen.
                        opt.authContext.login();
                    }
                    opt.authContext.acquireToken(Constants.DEFAULT_DOMAIN, function (error, renewedToken) {
                        if (!error) {
                            token_1 = renewedToken;
                        }
                    });
                }
                return token_1;
            }
            else if (opt.authType === AuthenticationType.anonymous) {
                var token = self._getItem(Constants.storage.accessTokenKey);
                if (!token) {
                    // Cached Token not present, invoke the user provided callback function to fetch function
                    self._triggerTokenFetch();
                }
                else {
                    // check for cached token validity
                    var expiresIn = self._getTokenExpiry(token);
                    if (expiresIn < 300 && expiresIn > 0) {
                        // We are within a window for the token expiry,
                        // trigger a new token fetch, but still return the current token
                        self._triggerTokenFetch();
                    }
                    else if (expiresIn <= 0) {
                        // token renew failed and don't have a token.
                        self._saveItem(Constants.storage.accessTokenKey, "");
                        throw new Error(Constants.errors.tokenExpired);
                    }
                }
                return token;
            }
            else if (opt.authType === AuthenticationType.subscriptionKey) {
                return opt.subscriptionKey;
            }
        };
        /**
         * Given a token, calculate the time left for token expiry in ms.
         * @param token
         * @internal
         */
        AuthenticationManager.prototype._getTokenExpiry = function (token) {
            /* const decodedToken = jwt_decode<{ exp: number }>(token);
             const expiresIn = decodedToken.exp;
             const now = this._getCurrentTime();
             return expiresIn - now > 0 ? expiresIn - now : -1;*/
            // Decode the JWT token to get the expiration timestamp
            var json = atob(token.split(".")[1]);
            var decode = JSON.parse(json);
            // Return the milliseconds until the token needs renewed
            // Reduce the time until renew by 5 minutes to avoid using an expired token
            // The exp property is the timestamp of the expiration in seconds
            var renewSkew = 300000;
            return (1000 * decode.exp) - Date.now() - renewSkew;
        };
        /**
         * stores the token
         * @param token token fetched from the user's server endpoint
         * @internal
         */
        AuthenticationManager.prototype._storeAccessToken = function (token) {
            // Store the value
            this._saveItem(Constants.storage.accessTokenKey, token);
        };
        /**
         * Saves the item to storage
         * @param key key/identifier
         * @param value value to be stored
         */
        AuthenticationManager.prototype._saveItem = function (key, value) {
            if (this._supportsLocalStorage()) {
                localStorage.setItem(key, value);
                return true;
            }
            else if (this._supportsSessionStorage()) {
                sessionStorage.setItem(key, value);
                return true;
            }
            else {
                AuthenticationManager.fallbackStorage[key] = value;
                return true;
            }
        };
        /**
         * Gets an item saved in storage
         * @param key Key/Identifier to be used for lookup
         */
        AuthenticationManager.prototype._getItem = function (key) {
            if (this._supportsLocalStorage()) {
                return localStorage.getItem(key);
            }
            else if (this._supportsSessionStorage()) {
                return sessionStorage.getItem(key);
            }
            else {
                return AuthenticationManager.fallbackStorage[key];
            }
        };
        /**
         * Returns true if browser supports localStorage, false otherwise.
         * @ignore
         */
        AuthenticationManager.prototype._supportsLocalStorage = function () {
            try {
                var wls = window.localStorage;
                var testStorageKey = Constants.storage.testStorageKey;
                if (!wls) {
                    return false;
                } // Test availability
                wls.setItem(testStorageKey, "A"); // Try write
                if (wls.getItem(testStorageKey) !== "A") {
                    return false;
                } // Test read/write
                wls.removeItem(testStorageKey); // Try delete
                if (wls.getItem(testStorageKey)) {
                    return false;
                } // Test delete
                return true; // Success
            }
            catch (e) {
                return false;
            }
        };
        /**
         * Returns true if browser supports sessionStorage, false otherwise.
         * @ignore
         */
        AuthenticationManager.prototype._supportsSessionStorage = function () {
            try {
                var wss = window.sessionStorage;
                var testStorageKey = Constants.storage.testStorageKey;
                if (!wss) {
                    return false;
                } // Test availability
                wss.setItem(testStorageKey, "A"); // Try write
                if (wss.getItem(testStorageKey) !== "A") {
                    return false;
                } // Test read/write
                wss.removeItem(testStorageKey); // Try delete
                if (wss.getItem(testStorageKey)) {
                    return false;
                } // Test delete
                return true; // Success
            }
            catch (e) {
                return false;
            }
        };
        AuthenticationManager.prototype.signRequest = function (request) {
            var self = this;
            var opt = self.options;
            var h = Constants;
            request.url = request.url.replace('{azMapsDomain}', opt.azMapsDomain);
            // Add the headers used for identifying a request is from the map control.
            var headers = request.headers || {};
            headers[h.SESSION_ID] = AuthenticationManager.sessionId;
            headers[h.MS_AM_REQUEST_ORIGIN] = h.MS_AM_REQUEST_ORIGIN_VALUE;
            headers[h.MAP_AGENT] = "MapControl/" + h.SDK_VERSION + " (" + h.TARGET_SDK + ")";
            var token = self.getToken();
            switch (opt.authType) {
                case AuthenticationType.aad:
                case AuthenticationType.anonymous:
                    headers[h.X_MS_CLIENT_ID] = opt.clientId;
                    headers[h.AUTHORIZATION] = h.AUTHORIZATION_SCHEME + " " + token;
                    break;
                case AuthenticationType.subscriptionKey:
                    if ("url" in request) {
                        var prefix = '?';
                        if (request.url.indexOf("?") !== -1) {
                            prefix = '&';
                        }
                        request.url += prefix + "subscription-key=" + token;
                    }
                    else {
                        throw new Error("No URL specified in request.");
                    }
                    break;
                default:
                    throw new Error("An invalid authentication type was specified");
            }
            request.headers = headers;
            return request;
        };
        AuthenticationManager.prototype.getRequest = function (url) {
            var request = this.signRequest({ url: url });
            //Proces the request.
            return fetch(request.url, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers(request.headers)
            });
        };
        AuthenticationManager.fallbackStorage = {};
        AuthenticationManager.sessionId = Helpers.uuid();
        return AuthenticationManager;
    }());

    var _renderV2TileUrl = "https://{azMapsDomain}/map/tile?api-version=" + Constants.RENDERV2_VERSION + "&tilesetId={tilesetId}&zoom={z}&x={x}&y={y}&tileSize={tileSize}&language={language}&view={view}";
    var _trafficFlowTileUrl = 'https://{azMapsDomain}/traffic/flow/tile/png?api-version=1.0&style={style}&zoom={z}&x={x}&y={y}';
    var _trafficIncidentTileUrl = 'https://{azMapsDomain}/traffic/incident/tile/png?api-version=1.0&style={style}&zoom={z}&x={x}&y={y}';
    /**
     * An imagery provider that connects to the Azure Maps Render V2 service.
     */
    var AzureMapsImageryProvider = /** @class */ (function (_super) {
        __extends(AzureMapsImageryProvider, _super);
        /************************
         * Constructor
         ***********************/
        /**
         * An imagery provider that connects to the Azure Maps Render V2 service.
         * @param options Azure Maps Tile layer options.
         */
        function AzureMapsImageryProvider(options) {
            var _this = _super.call(this, {
                url: _renderV2TileUrl,
                enablePickFeatures: false,
                tileWidth: 256,
                tileHeight: 256,
                maximumLevel: 22,
                hasAlphaChannel: false
            }) || this;
            _this._baseUrl = _renderV2TileUrl;
            _this._options = {};
            var self = _this;
            var opt = Object.assign({
                language: 'en-US',
                view: 'Auto',
                tilesetId: 'microsoft.base.road',
                trafficFlowThickness: 5
            }, options);
            self._options = opt;
            var au = opt.authOptions || {};
            if (!au.azMapsDomain) {
                au.azMapsDomain = Constants.SHORT_DOMAIN;
            }
            var am = AuthenticationManager.getInstance(au);
            self._authManager = am;
            if (!am.isInitialized()) {
                am.initialize().then(function () {
                    self._setTilesetId(opt.tilesetId);
                });
            }
            else {
                self._setTilesetId(opt.tilesetId);
            }
            return _this;
        }
        /**
         * Gets an Azure Maps imagery provider as an ImageryLayer.
         * @param azMapsOptions Options for connecting to the Azure Maps platform.
         * @param layerOptions Options for the imagery layer.
         */
        AzureMapsImageryProvider.getImageryLayer = function (azMapsOptions, layerOptions) {
            return new Cesium.ImageryLayer(new AzureMapsImageryProvider(azMapsOptions), layerOptions);
        };
        /**
         * Gets an array of all overlay imagery layers that are not base map layers from Azure Maps.
         * @param azMapsOptions Options for connecting to the Azure Maps platform.
         * @param layerOptions Options for the imagery layer.
         */
        AzureMapsImageryProvider.getAllOverlayImageryLayer = function (azMapsOptions, layerOptions) {
            var pvm = [];
            var td = Constants.TILESETS;
            Object.keys(td).forEach(function (tilesetId) {
                var ts = td[tilesetId];
                if (ts && !ts.isBasemap) {
                    pvm.push(AzureMapsImageryProvider.getImageryLayer(Object.assign({}, azMapsOptions, {
                        tilesetId: tilesetId
                    }), layerOptions));
                }
            });
            return pvm;
        };
        /**
         * Gets a ProviderViewModel for an Azure Maps layer.
         * @param options Options for connecting to the Azure Maps platform.
         * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
         */
        AzureMapsImageryProvider.getProviderViewModel = function (options, prependAzureMaps) {
            if (options) {
                options.tilesetId = options.tilesetId || 'microsoft.base.road';
                var info = Constants.TILESETS[options.tilesetId];
                if (info) {
                    var name_1 = ((typeof prependAzureMaps === 'boolean' && prependAzureMaps) ? 'Azure Maps ' : '') + info.name;
                    return new Cesium.ProviderViewModel({
                        name: name_1,
                        iconUrl: info.icon,
                        tooltip: name_1,
                        creationFunction: function () {
                            return new AzureMapsImageryProvider(options);
                        }
                    });
                }
            }
            return null;
        };
        /**
         * Gets an array of ProviderViewModel for all Azure Maps layer.
         * @param options Options for connecting to the Azure Maps platform.
         * @param prependAzureMaps Specifies if 'Azure Maps' should be added to the start of each layer name.
         */
        AzureMapsImageryProvider.getBaseMapProviderViewModels = function (options, prependAzureMaps) {
            var pvm = [];
            var td = Constants.TILESETS;
            Object.keys(td).forEach(function (tilesetId) {
                var ts = td[tilesetId];
                if (ts && ts.isBasemap) {
                    pvm.push(AzureMapsImageryProvider.getProviderViewModel(Object.assign({}, options, {
                        tilesetId: tilesetId
                    }), prependAzureMaps));
                }
            });
            return pvm;
        };
        /************************
         * Public functions
         ***********************/
        /**
         * Gets the attributions for a tile.
         * @param x Tile x coordinate.
         * @param y Tile y coordinate.
         * @param level Tile zoom level.
         */
        AzureMapsImageryProvider.prototype.getTileCredits = function (x, y, level) {
            var self = this;
            var ts = self._options.tilesetId;
            var partner;
            if (ts) {
                if (ts.startsWith('microsoft.base.') || ts.startsWith('microsoft.traffic.')) {
                    partner = 'TomTom';
                }
                else if (ts.startsWith('microsoft.weather.')) {
                    partner = 'AccuWeather';
                }
                else if (ts === 'microsoft.imagery') {
                    partner = 'Airbus';
                }
                if (partner) {
                    return [new Cesium.Credit("\u00A9 " + new Date().getFullYear() + " " + partner, true), new Cesium.Credit('Microsoft', true)];
                }
            }
            return [new Cesium.Credit('Microsoft', true)];
        };
        /**
         * Requests a map tile image.
         * @param x Tile x coordinate.
         * @param y Tile y coordinate.
         * @param level Tile zoom level.
         * @param request
         */
        AzureMapsImageryProvider.prototype.requestImage = function (x, y, level, request) {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (self._options.tilesetId) {
                    self._authManager.getRequest(self._getTileUrl(x, y, level)).then(function (r) {
                        r.blob().then(function (blobResponse) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                var img = document.createElement("img");
                                img.setAttribute("role", "presentation");
                                img.src = reader.result;
                                img.style.visibility = 'visible';
                                resolve(img);
                            };
                            reader.onerror = function () {
                                reject('Unable to load tile.');
                            };
                            reader.readAsDataURL(blobResponse);
                        });
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    reject('Azure Maps TilesetId not specified.');
                }
            });
        };
        /**
         * Gets the display name for the tilesetId of the imagery provider.
         */
        AzureMapsImageryProvider.prototype.getDisplayName = function () {
            var ts = this._options.tilesetId ? Constants.TILESETS[this._options.tilesetId] : null;
            return (ts) ? ts.name : null;
        };
        /** Gets the geopolitical view setting of the layer. */
        AzureMapsImageryProvider.prototype.getView = function () {
            return this._options.view;
        };
        /** Gets the language code used by the layer. */
        AzureMapsImageryProvider.prototype.getLanguage = function () {
            return this._options.language;
        };
        /** Gets the tileset ID of the layer. */
        AzureMapsImageryProvider.prototype.getTilesetId = function () {
            return this._options.tilesetId;
        };
        /**
         * Gets the time stamp value setting.
         */
        AzureMapsImageryProvider.prototype.getTimeStamp = function () {
            return this._options.timeStamp;
        };
        /**
         * Gets the traffic flow thickness setting.
         */
        AzureMapsImageryProvider.prototype.getTrafficFlowThickness = function () {
            return this._options.trafficFlowThickness;
        };
        /************************
        * Private functions
        ***********************/
        /**
         * Sets the tileset ID of the layer.
         * @param tilesetId The tileset to change to.
         */
        AzureMapsImageryProvider.prototype._setTilesetId = function (tilesetId) {
            var self = this;
            self._options.tilesetId = tilesetId;
            self._baseUrl = _renderV2TileUrl;
            if (tilesetId) {
                if (tilesetId.startsWith('microsoft.traffic.flow')) {
                    self._baseUrl = _trafficFlowTileUrl;
                }
                else if (tilesetId.startsWith('microsoft.traffic.incident')) {
                    self._baseUrl = _trafficIncidentTileUrl;
                }
            }
            self._refresh();
        };
        /**
         * Gets the tile URL for the specified map tile coordinates.
         * @param coords Map tile coordinates.
         */
        AzureMapsImageryProvider.prototype._getTileUrl = function (x, y, level) {
            var self = this;
            return self._getFormattedUrl()
                .replace('{x}', x.toString())
                .replace('{y}', y.toString())
                .replace('{z}', level.toString());
        };
        AzureMapsImageryProvider.prototype._refresh = function () {
            var self = this;
            var info = self._options.tilesetId ? Constants.TILESETS[self._options.tilesetId] : null;
            if (!info) {
                info = {
                    name: '',
                    maxZoom: 22,
                    hasAlpha: true
                };
            }
            _super.prototype.reinitialize.call(this, {
                url: self._getFormattedUrl(),
                enablePickFeatures: false,
                tileWidth: 256,
                tileHeight: 256,
                maximumLevel: info.maxZoom || 22,
                hasAlphaChannel: info.hasAlpha
            });
        };
        AzureMapsImageryProvider.prototype._getFormattedUrl = function () {
            var self = this;
            var opt = self._options;
            var url = self._baseUrl
                .replace('{tileSize}', '256')
                .replace('{language}', opt.language)
                .replace('{view}', opt.view)
                .replace('{tilesetId}', opt.tilesetId);
            if (opt.tilesetId && opt.tilesetId.startsWith('microsoft.traffic')) {
                url = url.replace('{style}', self._getTrafficStyle());
                if (opt.tilesetId.indexOf('flow') > 0) {
                    url += '&thickness=' + self._options.trafficFlowThickness;
                }
            }
            if (opt.timeStamp) {
                var ts = opt.timeStamp;
                if (opt.timeStamp instanceof Date) {
                    //Create an ISO 8601 timestamp string.
                    //JavaScripts format for ISO string includes decimal seconds and the letter "Z" at the end that is not supported. Use slice to remove this.
                    ts = opt.timeStamp.toISOString().slice(0, 19);
                }
                url = url.replace('{timeStamp}', ts);
            }
            return url;
        };
        AzureMapsImageryProvider.prototype._getTrafficStyle = function () {
            var ts = this._options.tilesetId;
            if (ts && ts.indexOf('microsoft.traffic.') > -1) {
                return ts.replace('microsoft.traffic.incident.', '').replace('microsoft.traffic.flow.', '');
            }
            return null;
        };
        return AzureMapsImageryProvider;
    }(Cesium.UrlTemplateImageryProvider));

    /** Enum of Azure Maps raster tilesets available from Azure Maps. */
    (function (AzureMapsTilesets) {
        /** Standard road map. */
        AzureMapsTilesets["ROAD"] = "microsoft.base.road";
        /** Standard road map in a dark grayscale style. */
        AzureMapsTilesets["DARK_GRAYSCALE_ROAD"] = "microsoft.base.darkgrey";
        /** Road map labels, no background. */
        AzureMapsTilesets["ROAD_LABELS"] = "microsoft.base.labels.road";
        /** Road maps of road features and labels, no background. */
        AzureMapsTilesets["ROAD_HYBRID"] = "microsoft.base.hybrid.road";
        /** Satellite imagery. */
        AzureMapsTilesets["IMAGERY"] = "microsoft.imagery";
        /** Colors will reflect the absolute speed measured. Absolute speed is the capability to access the full speed. */
        AzureMapsTilesets["TRAFFIC_FLOW_ABSOLUTE"] = "microsoft.traffic.flow.absolute";
        /** Displays relative colors but a larger difference from free flow is required for segments to change the color. */
        AzureMapsTilesets["TRAFFIC_FLOW_REDUCED_SENSITIVITY"] = "microsoft.traffic.flow.reduced-sensitivity";
        /** This is the speed relative to free-flow, highlighting areas of congestion visualizing the traffic flow. Free-flow refers to conditions where there is no congestion and traffic can follow the speed limits. The most used option to visualize traffic flow on a map. */
        AzureMapsTilesets["TRAFFIC_FLOW_RELATIVE"] = "microsoft.traffic.flow.relative";
        /** Displays relative colors only where they are different from the free-flow speeds. This option will only highlights areas of congestion. */
        AzureMapsTilesets["TRAFFIC_FLOW_RELATIVE_DELAY"] = "microsoft.traffic.flow.relative-delay";
        /** Night styled traffic incident overlay. */
        AzureMapsTilesets["TRAFFIC_INCIDENT_NIGHT"] = "microsoft.traffic.incident.night";
        /** Creates traffic lines with colored chevrons indicating severity. */
        AzureMapsTilesets["TRAFFIC_INCIDENT_S1"] = "microsoft.traffic.incident.s1";
        /** Creates plain lines with certain degree of glow. */
        AzureMapsTilesets["TRAFFIC_INCIDENT_S2"] = "microsoft.traffic.incident.s2";
        /** Creates plain lines with certain degree of glow. */
        AzureMapsTilesets["TRAFFIC_INCIDENT_S3"] = "microsoft.traffic.incident.s3";
        /** Weather infrared tiles. Latest Infrared Satellite images shows clouds by their temperature. */
        AzureMapsTilesets["WEATHER_INFRARED"] = "microsoft.weather.infrared.main";
        /** Weather radar tiles. Latest weather radar images including areas of rain, snow, ice and mixed conditions. */
        AzureMapsTilesets["WEATHER_RADAR"] = "microsoft.weather.radar.main";
    })(exports.AzureMapsTilesets || (exports.AzureMapsTilesets = {}));

    var azMapsSearchUrl = 'https://{azMapsDomain}/search/{searchService}/json?api-version=1.0&query={query}&language={language}&view={view}&typeahead={typeahead}';
    /** A geocoding service powered by Azure Maps. */
    var AzureMapsGeocoderService = /** @class */ (function () {
        /************************
         * Constructor
         ***********************/
        /**
         * A geocoding service powered by Azure Maps.
         * @param options The options for the geocoding service.
         */
        function AzureMapsGeocoderService(options) {
            this._options = {};
            var self = this;
            var opt = Object.assign({
                language: 'en-US',
                view: 'Auto',
                searchService: 'FUZZY',
                preferRectangle: true,
                limit: 10
            }, options);
            self._options = opt;
            var au = opt.authOptions || {};
            if (!au.azMapsDomain) {
                au.azMapsDomain = Constants.SHORT_DOMAIN;
            }
            var am = AuthenticationManager.getInstance(au);
            self._authManager = am;
            if (!am.isInitialized()) {
                am.initialize();
            }
        }
        /**
         * Processes a search query.
         * @param query The query to geocode.
         * @param type Type of geocode search to perform. A regular SEARCH, or an AUTOCOMPLETE. When in auto complete mode, the service goes into predictive mode.
         */
        AzureMapsGeocoderService.prototype.geocode = function (query, type) {
            var self = this;
            return new Promise(function (resolve, reject) {
                var opt = self._options;
                var url = azMapsSearchUrl
                    .replace('{searchService}', opt.searchService.replace(/_/gi, '/'))
                    .replace('{query}', query)
                    .replace('{language}', opt.language)
                    .replace('{view}', opt.view)
                    .replace('{typeahead}', (type === 'AUTOCOMPLETE').toString());
                if (opt.searchService !== 'ADDRESS_REVERSE') {
                    url += '&limit=' + opt.limit;
                }
                self._authManager.getRequest(url).then(function (r) {
                    r.json().then(function (response) {
                        var results = [];
                        if (response) {
                            var responses = response.results || response.addresses;
                            responses.forEach(function (r) {
                                var destination;
                                if (opt.preferRectangle && r.viewport) {
                                    var vp = r.viewport;
                                    destination = Cesium.Rectangle.fromDegrees(vp.topLeftPoint.lon, vp.btmRightPoint.lat, vp.btmRightPoint.lon, vp.topLeftPoint.lat);
                                }
                                if (!destination) {
                                    if (typeof r.position === 'string') {
                                        var split = r.position.split(',');
                                        destination = Cesium.Cartesian3.fromDegrees(parseFloat(split[1]), parseFloat(split[0]));
                                    }
                                    else {
                                        destination = Cesium.Cartesian3.fromDegrees(r.position.lon, r.position.lat);
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
                }, function (e) {
                    reject(e);
                });
            });
        };
        return AzureMapsGeocoderService;
    }());

    /** Enum of Azure Maps search services that can be accessed by the `AzureMapsGeocoderService`. */
    (function (AzureMapsSearchServices) {
        /** Address geocoder. */
        AzureMapsSearchServices["ADDRESS"] = "ADDRESS";
        /** Reverse geocoder. Coordinates to address. */
        AzureMapsSearchServices["ADDRESS_REVERSE"] = "ADDRESS_REVERSE";
        /** Reverse geocoder to nearby cross street(s). */
        AzureMapsSearchServices["ADDRESS_REVERSE_CROSSSTREET"] = "ADDRESS_REVERSE_CROSSSTREET";
        /** Fuzzy search which combines of address geocoding and point of interest search. */
        AzureMapsSearchServices["FUZZY"] = "FUZZY";
        /** Point of interest search. */
        AzureMapsSearchServices["POI"] = "POI";
        /** Point of interest category search. */
        AzureMapsSearchServices["POI_CATEGORY"] = "POI_CATEGORY";
    })(exports.AzureMapsSearchServices || (exports.AzureMapsSearchServices = {}));

    exports.AzureMapsGeocoderService = AzureMapsGeocoderService;
    exports.AzureMapsImageryProvider = AzureMapsImageryProvider;

}(this.Cesium = this.Cesium || {}, Cesium));
