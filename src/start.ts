import Server from './Server';
import * as minimist from 'minimist';
import { config } from 'dotenv';

config();

const argv = minimist(process.argv.slice(2));
// // Check whether host is set via cli arguments or environment
const host = argv.host || process.env.HOST || '0.0.0.0';
// Check whether port is set via cli arguments or environment
const port = argv.port || process.env.PORT || 5000;

const server = new Server();
server.start(host, port);
