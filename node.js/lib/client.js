/*
 * client.js: Top-level include for the provisioner API client.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
exports.Client  = require('./client/client').Client;
exports.Envs    = require('./client/envs').Envs;
exports.Groups  = require('./client/groups').Groups;
exports.Roles   = require('./client/roles').Roles;
exports.Systems = require('./client/systems').Systems;
exports.Servers = require('./client/servers').Servers;
exports.Users   = require('./client/users').Users;

exports.createClient = function (options) {
  return {
    envs: new exports.Envs(options),
    groups: new exports.Groups(options),
    roles: new exports.Roles(options),
    systems: new exports.Systems(options),
    servers: new exports.Servers(options),
    users: new exports.Users(options)
  };
};