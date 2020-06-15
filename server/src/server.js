#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const apiRoutes = require('./routes/index');
// Create express server app
const expressServer = express();
// Check whether port is set via cli arguments or environment
const port = argv.port || process.env.PORT || 5000;
// Check whether host is set via cli arguments or environment
const host = argv.host || process.env.HOST || '0.0.0.0';

// Define the routes
expressServer.use('/api', apiRoutes);

// Start app
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  console.log('Start server in production mode');
  // Serve any static files
  expressServer.use(express.static(path.join(__dirname, 'client')));
  // Handle React routing, return all requests to React app
  expressServer.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });
} else {
  console.log('Start server in development mode');
}

// Default error handling
expressServer.use(function errorHandler(err, req, res) {
  res.status(400).send({ error: err });
});

expressServer.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
