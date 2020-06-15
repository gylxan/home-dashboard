# Description
This project contains a home dashboard as server client application
* Server - node with `express` API
* Client - client with `React` application

# Commands
## Install
`npm install` installs the dependencies of the root project for building/bundle the
whole project. It also triggers the installation of dependencies of the
server and client application.
## Start
`npm start` starts the server and client in development mode parallel with 
`concurrently`.

### Start client
`npm start:client` starts the client in development mode.

### Start server
`npm start:server` starts the server in development mode.  

## Build
Build the application. Bundles the client and moves everything to the `build` folder.
You can start the application by calling `node ./server.js`.
The express handler then serves the API and the bundles react files.
For further information, read the documentation in `./server`.