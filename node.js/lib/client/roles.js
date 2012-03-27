/*
 * roles.js: Client for the provisioner `roles` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Roles (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Roles client to the Conservatory REST API.
//
var Roles = exports.Roles = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Roles, client.Client);

//
// ### function create (role, callback)
// #### @role {Object} Group to create.
// #### @callback {function} Continuation to pass control back to when complete.
// Creates the specified `role`.
//
Roles.prototype.create = function (role, callback) {
  this._request({
    method: 'POST', 
    path: '/roles/' + role.name,
    body: role
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (name, callback)
// #### @name {string} Name of the role to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the role with the specified `name`.
//
Roles.prototype.get = function (name, callback) {
  this._request('/roles/' + name, callback, function (res, result) {
    callback(null, result.role);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all roles managed by the provisioner associated with this instance. 
//
Roles.prototype.list = function (callback) {
  this._request('/roles', callback, function (res, result) {
    callback(null, result.roles);
  });
};

//
// ### function update (role, callback)
// #### @role {object} Properties to update the role with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the role with the properties specified.
//
Roles.prototype.update = function (role, callback) {
  this._request({
    method: 'PUT', 
    path: '/roles/' + (role._id || role.name),
    body: role
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function destroy (name)
// #### @name {object} Name of the role to destroy.
// #### @callback {function} Continuation to pass control back to when complete.
// Destroys the Group for the server with the specified name.
//
Roles.prototype.destroy = function (name, callback) {
  this._request({
    method: 'DELETE', 
    path: '/roles/' + name
  }, callback, function (res, result) {
    callback(null, result);
  });
};