/*
 * servers.js: Client for the provisioner `servers` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Servers (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Servers client to the Conservatory REST API.
//
var Servers = exports.Servers = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Servers, client.Client);

//
// ### function provision (callback)
// #### @options {object} Provisioning options being requested (role, count, etc).
// #### @callback {function} Continuation to pass control back to when complete.
// Provisions a new server from this instance.
//
Servers.prototype.provision = function (options, callback) {
  if (typeof options === 'string') {
    options = { role: options };
  }
  
  options.count = options.count || 1;
  this._request('POST', '/provision', options, callback, function (res, result) {
    callback(null, result.jobId, result.servers);
  });
};

//
// ### function provision (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Provisions a new server from this instance.
//
Servers.prototype.getPosition = function (jobId, callback) {
  this._request('GET', '/jobs/' + jobId, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function free (id, callback)
// #### @id {string} Id of the server to free.
// #### @callback {function} Continuation to pass control back to when complete.
// Attempts to free the server with the specified `id`.
//
Servers.prototype.free = function (id, callback) {
  this._request('DELETE', '/provision/' + id, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (id, callback)
// #### @id {string} Id of the server to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the server with the specified `id`.
//
Servers.prototype.get = function (id, callback) {
  this._request('GET', '/servers/' + id, callback, function (res, result) {
    callback(null, result.server);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all servers managed by the provisioner associated with this instance. 
//
Servers.prototype.list = function (callback) {
  this._request('GET', '/servers', callback, function (res, result) {
    callback(null, result.servers);
  })
};

//
// ### function list (role, callback)
// #### @role {string} Role of the servers to list.
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all servers managed by the provisioner associated with this instance
// for the specified `role`. 
//
Servers.prototype.listRole = function (role, callback) {
  this._request('GET', '/servers/' + role + '/role', callback, function (res, result) {
    callback(null, result.servers);
  });
};

//
// ### function list (role, callback)
// #### @role {string} Group of the servers to list.
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all servers managed by the provisioner associated with this instance
// for the specified `group`. 
//
Servers.prototype.listGroup = function (group, callback) {
  this._request('GET', '/servers/' + group + '/group', callback, function (res, result) {
    callback(null, result.servers);
  });
};

//
// ### function list (server)
// #### @server {object} Properties to update the server with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the server with the properties specified.
//
Servers.prototype.update = function (server, callback) {
  this._request('PUT', '/servers/' + server._id || server.id, callback, function (res, result) {
    callback(null, result);
  });
};