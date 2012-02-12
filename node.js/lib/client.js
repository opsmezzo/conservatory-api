/*
 * client.js: Top-level include for the provisioner API client.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
exports.Client  = require('./client/client').Client
exports.Servers = require('./client/servers').Servers;
exports.Groups  = require('./client/groups').Groups;
exports.Users   = require('./client/users').Users;

exports.createClient = function (options) {
  return {
    servers: new exports.Servers(options),
    groups: new exports.Groups(options),
    users: new exports.Users(options)
  };
};