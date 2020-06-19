# Description
This project contains a boiler plate for a server client application.
* Server - node with `express` API
* Client - client with `React` application

Both is using TypeScript!

# Commands
## Install
`npm install` installs the dependencies of the root project for building/bundle the
whole project and the client application.

## Start
`npm start` starts the productive build server-client-application.
You can specify a port and a host, where the application should be served from.
Default is: 
`Port: 5000` and `Host: 0.0.0.0`.
To set the port or/and host the call must have the following form:
`npm start -- --port=80 --host=localhost`

### Start server and client in development mode
`npm start:dev` starts the server and client in development mode.

### Start server in development mode
`npm start:dev-server` starts the server in development mode.
As described above, you can specify a port and host, the server should start from.
_Notice_: When you change the port or the host, you also have to change the proxy attribute in the client
`package.json` for development. See description below. 

### Start client in development mode
`npm start:dev-client` starts the client in development mode.
While the client runs in development mode, it uses the port `3000`.
Configured in the `package.json`, all requests to the server will be redirected to the port `5000` of localhost.
To change this, simply change the `proxy` attribute in `/src/public/react/package.json`. 

## Build
Build the application. Transpiles the server, builds and bundles the client application and moves 
the application to `./build`;
The express handler then serves the API and the bundles react files.