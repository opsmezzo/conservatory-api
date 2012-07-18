/*
 * client.js: Top-level include for the provisioner API client.
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
exports.Client  = require('./client/client').Client;
exports.Config  = require('./client/config').Config;
exports.Groups  = require('./client/groups').Groups;
exports.Roles   = require('./client/roles').Roles;
exports.Systems = require('./client/systems').Systems;
exports.Servers = require('./client/servers').Servers;
exports.Users   = require('./client/users').Users;

exports.createClient = function (type, options) {
  if (type === 'composer') {
    return {
      config:  new exports.Config(options),
      systems: new exports.Systems(options),
      users:   new exports.Users(options)
    };
  }
  else if (type === 'provisioner') {
    return {
      groups:  new exports.Groups(options),
      roles:   new exports.Roles(options),
      servers: new exports.Servers(options),
      users:   new exports.Users(options)
    };
  }
  else {
    throw new Error('Unknown client type');
  }
};