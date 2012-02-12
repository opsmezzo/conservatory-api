/*
 * users.js: Client for the conservatory `users` resource.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var utile = require('utile'),
    client = require('./client');

//
// ### function Users (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Users client to the 
// Conservatory provisioner server.
//
var Users = exports.Users = function (options) {
  client.Client.call(this, options);
};

//
// Inherit from `client.Client`
//
utile.inherits(Users, client.Client);

//
// ### function create (user, callback)
// #### @user {string} User to create.
// #### @callback {function} Continuation to pass control back to when complete.
// Creates a user with the data specified.
//
Users.prototype.create = function (user, callback) {
  this._request('POST', '/users/' + user.username, user, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function get (id, callback)
// #### @id {string} Id of the user to retrieve.
// #### @callback {function} Continuation to pass control back to when complete.
// Responds with information about the user with the specified `id`.
//
Users.prototype.get = function (id, callback) {
  this._request('GET', '/users/' + id, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function list (callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Lists all users managed by the provisioner associated with this instance. 
//
Users.prototype.list = function (callback) {
  this._request('GET', '/users', callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function update (user, callback)
// #### @user {object} Properties to update the user with.
// #### @callback {function} Continuation to pass control back to when complete.
// Updates the user with the properties specified.
//
Users.prototype.update = function (user, callback) {
  this._request('PUT', '/users/' + user._id || user.username, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function destroy (id)
// #### @id {object} Id of the user to destroy.
// #### @callback {function} Continuation to pass control back to when complete.
// Destroys the Group for the server with the specified id.
//
Users.prototype.destroy = function (id, callback) {
  this._request('DELETE', '/users/' + id, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function addKey | updateKey (id, keyname, data, callback)
// #### @id {string} Id of the user to add or update keys for.
// #### @keyname {string} **Optional** Keyname to add or update.
// #### @data {string} Data for the key
// #### @callback {function} Continuation to respond to when complete.
// Adds or updates `keyname` for the specified user `id` with the `data`.
// If no `keyname` is supplied then `publicKey` will be used.
//
Users.prototype.addKey = Users.prototype.updateKey = function (id, keyname, data, callback) {
  if (arguments.length === 3) {
    callback = data;
    data = keyname;
    keyname = 'publicKey';
  }
  
  this._request('POST', '/' + ['keys', id, keyname].join('/'), { key: data }, callback, function (res, result) {
    callback(null);
  });
};

//
// ### function addKey | updateKey (id, keyname, data, callback)
// #### @id {string} Id of the user to add or update keys for.
// #### @keyname {string} **Optional** Keyname to add or update.
// #### @callback {function} Continuation to respond to when complete.
// Retrieves `keyname` for the specified user `id`. If no `keyname` is supplied 
// then `publicKey` will be retrieved.
//
Users.prototype.getKey = function (id, keyname, callback) {
  if (arguments.length === 2) {
    callback = keyname;
    keyname = 'publicKey';
  }
  
  this._request('GET', '/' + ['keys', id, keyname].join('/'), callback, function (res, result) {
    callback(null, result.key);
  });
};

//
// ### function addKey | updateKey (id, keyname, data, callback)
// #### @id {string} **Optional** Id of the user to get all keys for.
// #### @callback {function} Continuation to respond to when complete.
// Retrieves all keys for the user with the specified `id`. If no `id`
// is supplied then all keys for all users will be returned.
//
Users.prototype.getKeys = function (id, callback) {
  if (!callback && typeof id === 'function') {
    callback = id;
    id = null;
  }
  
  this._request('GET', '/' + ['keys', id].filter(Boolean).join('/'), callback, function (res, result) {
    callback(null, result.keys);
  });
};