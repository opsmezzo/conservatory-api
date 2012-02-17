/*
 * servers.js: Client for the provisioner `servers` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Groups (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Groups client to the Conservatory REST API.
//
var Groups = exports.Groups = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Groups, client.Client);

//
// ### function create (group, callback)
// #### @group {Object} Group to create.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the group with the specified `id`.
//
Groups.prototype.create = function (group, callback) {
  this._request('POST', '/groups/' + group.name, group, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (id, callback)
// #### @id {string} Id of the group to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the group with the specified `id`.
//
Groups.prototype.get = function (id, callback) {
  this._request('GET', '/groups/' + id, callback, function (res, result) {
    callback(null, result.group);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all groups managed by the provisioner associated with this instance. 
//
Groups.prototype.list = function (callback) {
  this._request('GET', '/groups', callback, function (res, result) {
    callback(null, result.groups);
  });
};

//
// ### function listProvider (provider, callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all groups managed by the provisioner associated with this instance. 
//
Groups.prototype.listProvider = function (provider, callback) {
  this._request('GET', '/groups/' + provider + '/provider', callback, function (res, result) {
    callback(null, result.groups);
  });
};

//
// ### function update (user, callback)
// #### @group {object} Properties to update the group with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the group with the properties specified.
//
Groups.prototype.update = function (user, callback) {
  this._request('PUT', '/groups/' + group._id || group.name, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function destroy (id)
// #### @id {object} Id of the group to destroy.
// #### @callback {function} Continuation to pass control back to when complete.
// Destroys the Group for the server with the specified id.
//
Groups.prototype.destroy = function (id, callback) {
  this._request('DELETE', '/groups/' + id, callback, function (res, result) {
    callback(null, result);
  });
};