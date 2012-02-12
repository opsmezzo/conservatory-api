# conservatory-api/node.js

The node.js conservatory-api library enables access to the RESTful API for [`conservatory`](https://github.com/nodejitsu/conservatory).

## Example:

```js
var conservatory = require('conservatory-api');

var client = conservatory.createClient({
  host: 'api.nodejitsu.com',
  port: 80,
  auth: {
    username: 'charlie',
    password: 'foobar',
  }
});

client.groups.list(function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log(JSON.stringify(result, null, 2, true));
});
```

## Usage:

### api.createClient(options)

This method sets up a client for connecting to `conservatory`. Here's a minimal example for connecting to conservatory as `charlie`:

``` js
var client = conservatory.createClient({
  host: 'api.nodejitsu.com',
  port: 80,
  auth: {
    username: 'charlie',
    password: 'foobar',
  }
});
```

The options object contains three required properties:

* `username`: The username for your Nodejitsu account
* `password`: The password for your Nodejitsu account
* `remoteUri`: The uri of the api host (typically (http://api.nodejitsu.com)[http://api.nodejitsu.com]).

### client

Method calls are generally structured as `resource` and `action`.

``` js
client.resource.action("data", function (err, result) {
  if (err) {
    throw err;
  }

  //
  // use the result
  //
});
```

Most actions take a string argument and a callback, though a few actions only take a callback.

The client's methods are reflective of [`conservatory`](https://github.com/nodejitsu/conservatory/tree/master/lib/resources) resources. Here's a broad overview:

* **client.servers**: Manage your server instances. Methods include:
  * `servers.provision`
  * `servers.getPosition`
  * `servers.free`
  * `servers.get`
  * `servers.list`
  * `servers.list`
  * `servers.listRole`
  * `servers.update`
* **client.groups**: Manage your server groups. Methods include:
  * `groups.get`
  * `groups.list`
  * `groups.listProvider`
  * `groups.update`
  * `groups.destroy`
* **client.users**: Manage your conservatory accounts. Methods include:
  * `users.create`
  * `users.get`
  * `users.list`
  * `users.update`
  * `users.destroy`
  * `users.getKey`
  * `users.getKeys`
  * `users.addKey`
  * `users.updateKey`

## Installation

This library may be installed using npm:

``` bash
  $ npm install nodejitsu-api
```

## Tests
All tests are included in [`conservatory`](https://github.com/nodejitsu/conservatory/tree/master/tests) to facilitate integration tests and to avoid the need for complex mocking.

## License
Proprietary. Copyright (c) 2011 Nodejitsu Inc.
