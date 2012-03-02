/*
 * client.js: Top-level include for the provisioner API client.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
exports.Client  = require('./client/client').Client;
exports.Systems = require('./client/systems').Systems;
exports.Servers = require('./client/servers').Servers;
exports.Groups  = require('./client/groups').Groups;
exports.Users   = require('./client/users').Users;

exports.createClient = function (options) {
  return {
    systems: new exports.Systems(options),
    servers: new exports.Servers(options),
    groups: new exports.Groups(options),
    users: new exports.Users(options)
  };
};