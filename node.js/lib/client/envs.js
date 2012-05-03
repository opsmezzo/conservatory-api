/*
 * envs.js: Client for the `envs` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Envs (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Envs client to the Conservatory REST API.
//
var Envs = exports.Envs = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Envs, client.Client);

//
// ### function create (env, callback)
// #### @env {Object} Env to create.
// #### @callback {function} Continuation to pass control back to when complete.
// Creates the specified `env`.
//
Envs.prototype.create = function (env, callback) {
  this._request({
    method: 'POST', 
    path: '/envs/' + env.name, 
    body: env
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (name, callback)
// #### @name {string} Name of the env to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the env with the specified `name`.
//
Envs.prototype.get = function (name, callback) {
  this._request('/envs/' + name, callback, function (res, result) {
    callback(null, result.env);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all envs managed by the provisioner associated with this instance. 
//
Envs.prototype.list = function (callback) {
  this._request('/envs', callback, function (res, result) {
    callback(null, result.envs);
  });
};

//
// ### function destroy (name)
// #### @name {object} Name of the env to destroy.
// #### @callback {function} Continuation to pass control back to when complete.
// Destroys the Env for the server with the specified name.
//
Envs.prototype.destroy = function (name, callback) {
  this._request({
    method: 'DELETE', 
    path: '/envs/' + name
  }, callback, function (res, result) {
    callback(null, result);
  });
};