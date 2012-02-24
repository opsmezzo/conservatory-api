/*
 * systems.js: Client for the `systems` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Systems (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Systems client to the Conservatory REST API.
//
var Systems = exports.Systems = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Systems, client.Client);

//
// ### function create (system, callback)
// #### @system {Object} System to create.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the system with the specified `id`.
//
Systems.prototype.create = function (system, callback) {
  this._request('POST', '/systems/' + system.name, system, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (id, callback)
// #### @id {string} Id of the system to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the system with the specified `id`.
//
Systems.prototype.get = function (id, callback) {
  this._request('GET', '/systems/' + id, callback, function (res, result) {
    callback(null, result.system);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all systems managed by the provisioner associated with this instance. 
//
Systems.prototype.list = function (callback) {
  this._request('GET', '/systems', callback, function (res, result) {
    callback(null, result.systems);
  });
};

//
// ### function update (system, callback)
// #### @system {object} Properties to update the system with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the system with the properties specified.
//
Systems.prototype.update = function (system, callback) {
  this._request('PUT', '/systems/' + system._id || system.name, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function destroy (id)
// #### @id {object} Id of the system to destroy.
// #### @callback {function} Continuation to pass control back to when complete.
// Destroys the System for the server with the specified id.
//
Systems.prototype.destroy = function (id, callback) {
  this._request('DELETE', '/systems/' + id, callback, function (res, result) {
    callback(null, result);
  });
};

Systems.prototype.upload = function (name, version, callback) {
  return this._request('PUT', '/systems/' + name + '/' + version, callback);
};

Systems.prototype.download = function (name, version, callback) {
  return this._request('GET', '/systems/' + name + '/' + version, callback);
}