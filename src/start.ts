import Server from './Server';
import * as minimist from 'minimist';
import { config } from 'dotenv';
import {getEnvVar, getNonFilledRequiredEnvVars} from "./helpers/environment";

config();
const nonFilledRequiredEnvVars = getNonFilledRequiredEnvVars();
if (getNonFilledRequiredEnvVars().length >= 1) {
  console.error(
    `The following required environment variables are not properly filled: ${nonFilledRequiredEnvVars.join(', ')}`,
  );
  process.exit(1);
}

const argv = minimist(process.argv.slice(2));
// // Check whether host is set via cli arguments or environment
const host = argv.host || getEnvVar('HOST') || '0.0.0.0';
// Check whether port is set via cli arguments or environment
const port = argv.port || getEnvVar('PORT') || 5000;

const server = new Server();
server.start(host, port);
