/*
 * client.js: Client for the RESTful provisioner service.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var events = require('events'),
    utile = require('utile'),
    request = require('request'),
    base64 = utile.base64;

//
// ### function Client (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Client to the Nodejitsu provisioner server.
//
var Client = exports.Client = function (options) {
  events.EventEmitter.call(this);
  this.options = options || {};
    
  if (typeof this.options.get !== 'function') {
    this.options.get = function (key) {
      return this[key];
    }
  }
  
  // 
  // TODO (indexzero): Configure the provisioner port globally somewhere.
  //
  this.config = {
    host: options.host || 'localhost',
    port: options.port || 9000,
    auth: options.auth
  };
  
  if (options.auth && options.auth.username && options.auth.password) {
    this._auth = 'Basic ' + base64.encode([options.auth.username, options.auth.password].join(':'));
  }
};

//
// Inherit from `events.EventEmitter`
//
utile.inherits(Client, events.EventEmitter);

// Failure HTTP Response codes based
// off of `/lib/conservatory/provisioner/service.js`
Client.prototype.failCodes = {
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Item not found',
  500: 'Internal Server Error'
};

// Success HTTP Response codes based
// off of `/lib/conservatory/provisioner/service.js`
Client.prototype.successCodes = {
  200: 'OK',
  201: 'Created'
};

//
// ### @remoteUri {string}
// Full URI for the remote Haibu server this client
// is configured to request against.
//
Client.prototype.__defineGetter__('remoteUri', function () {
  return 'http://' + this.config.host + ':' + this.config.port;
});

//
// ### @private _request (method, uri, [body], callback, success)
// #### @options {Object} Outgoing request options.
// #### @callback {function} Continuation to short-circuit to if request is unsuccessful.
// #### @success {function} Continuation to call if the request is successful
// Core method for making requests against the haibu Drone API. Flexible with respect
// to continuation passing given success and callback.
//
Client.prototype._request = function (options, callback, success) {
  var self = this;
  
  if (typeof options === 'string') {
    options = { path: options };
  }
  
  options.method  = options.method || 'GET';
  options.uri     = this.remoteUri + options.path;
  options.headers = options.headers || {};
  options.headers['content-type'] = options.headers['content-type'] || 'application/json';
    
  if (!this._auth && this.config.auth.username && this.config.auth.password) {
    this._auth = 'Basic ' + base64.encode([this.config.auth.username, this.config.auth.password].join(':'));
  }
  
  if (this._auth) {
    options.headers['Authorization'] = this._auth;
  }

  if (options.headers['content-type'] === 'application/json'
    && options.body) {
    options.body = JSON.stringify(options.body);
  }

  return request(options, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    var statusCode = response.statusCode.toString(),
        result,
        error;
        
    try {
      result = JSON.parse(body);
    }
    catch (ex) {
      // Ignore Errors
    }
    
    if (Object.keys(self.failCodes).indexOf(statusCode) !== -1) {
      error = new Error('conservatory Error (' + statusCode + '): ' + self.failCodes[statusCode]);
      error.result = result;
      error.status = statusCode;
      return callback(error);
    }

    success(response, result);
  });
};
