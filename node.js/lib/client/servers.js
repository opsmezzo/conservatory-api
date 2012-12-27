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
// ### function add (server, callback)
// #### @group {Object} Server to add to conservatory.
// #### @callback {function} Continuation to pass control back to when complete.
// Adds the specified `server` to conservatory.
//
Servers.prototype.add = function (server, callback) {
  this._request({
    method: 'POST', 
    path: '/servers/' + server._id,
    body: server
  }, callback, function (res, result) {
    callback(null, result);
  });
};

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
  this._request({
    method: 'POST', 
    path: '/provision', 
    body: options
  }, callback, function (res, result) {
    callback(null, result.jobId, result.servers);
  });
};

//
// ### function provision (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Provisions a new server from this instance.
//
Servers.prototype.getPosition = function (jobId, callback) {
  this._request('/jobs/' + jobId, callback, function (res, result) {
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
  this._request({
    method: 'DELETE', 
    path: '/provision/' + id
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (server, callback)
// #### @id {string|Object} Server (or id of server) to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the server with the specified `id`.
//
Servers.prototype.get = function (server, callback) {
  var url = server.group
    ? ['groups', server.group]
    : [];

  this._request(
    '/' + url.concat(['servers', server.id || server]).join('/'),
    callback,
    function (res, result) {
      callback(null, result.server);
    }
  );
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all servers managed by the provisioner associated with this instance. 
//
Servers.prototype.list = function (callback) {
  this._request('/servers', callback, function (res, result) {
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
  this._request('/roles/' + role + '/servers', callback, function (res, result) {
    callback(null, result.servers);
  });
};

//
// ### function list (group, callback)
// #### @group {string} Group of the servers to list.
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all servers managed by the provisioner associated with this instance
// for the specified `group`. 
//
Servers.prototype.listGroup = function (group, callback) {
  this._request('/groups/' + group + '/servers', callback, function (res, result) {
    callback(null, result.servers);
  });
};

//
// ### function update (server, callback)
// #### @server {object} Properties to update the server with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the server with the properties specified.
//
Servers.prototype.update = function (server, callback) {
  var url = server.group
    ? ['groups', server.group]
    : [];

  this._request({
    method: 'PUT', 
    path: '/' + url.concat(['servers', server.id]).join('/'),
    body: server
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function destroy (server, callback)
// #### @server {string|object} Server (or id of server) to delete.
// #### @callback {function} Continuation to pass control back to when complete.
// Attempts to destroy the specified `server` from conservatory.
//
Servers.prototype.destroy = function (server, callback) {
  var url = server.group
    ? ['groups', server.group]
    : [];

  this._request({
    method: 'DELETE',
    path: '/' + url.concat(['servers', server.id || server]).join('/'),
  }, callback, function (res, result) {
    callback(null, result);
  });
};
