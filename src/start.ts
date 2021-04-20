import * as minimist from 'minimist';
import { config } from 'dotenv';
import * as path from 'path';
const argv = minimist(process.argv.slice(2));
// Load .env file before importing server and other things
config({ path: argv.config_path || path.resolve(process.cwd(), '.env') });

import Server from './server/Server';
import { getEnvVar, getNonFilledRequiredEnvVars } from './server/helpers/environment';

const nonFilledRequiredEnvVars = getNonFilledRequiredEnvVars();
if (getNonFilledRequiredEnvVars().length >= 1) {
  console.error(
    `The following required environment variables are not properly filled: ${nonFilledRequiredEnvVars.join(', ')}`,
  );
  process.exit(1);
}

// // Check whether host is set via cli arguments or environment
const host = argv.host || getEnvVar('HOST') || '0.0.0.0';
// Check whether port is set via cli arguments or environment
const port = argv.port || getEnvVar('PORT') || 5000;

const server = new Server();
server.start(host, port);
