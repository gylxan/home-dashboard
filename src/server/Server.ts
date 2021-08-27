import * as express from 'express';
import controllers from './controllers';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Error } from './interfaces/error';
import { getEnvVar, isProductionEnvironment } from './helpers/environment';
import { NextFunction } from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import * as fs from 'fs';
import Logger from './classes/Logger';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeControllers(): void {
    // Define the routes
    this.app.use('/api', controllers);
    Logger.debug(`Add ${controllers.stack.length} API controllers to server`);
    if (isProductionEnvironment()) {
      Logger.info('Start server in production mode');
      this.serveFrontend();
    } else {
      Logger.info('Start server in development mode');
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(function errorMiddleware(
      error: Error,
      request: express.Request,
      response: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction,
    ) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      response.status(status).send({
        status,
        message,
      });
    });
  }

  private serveFrontend(): void {
    const dir = path.join(__dirname, '../client/');
    // Set the static and views directory
    this.app.set('views', dir);
    this.app.use(express.static(dir));
    // Serve front-end content
    this.app.get('*', (req, res) => {
      res.sendFile('index.html', { root: dir });
    });
  }

  private static getHttpsOptions(): { cert: Buffer; key: Buffer } {
    if (!fs.existsSync(getEnvVar('PRIVATE_KEY_PATH') ?? '')) {
      throw "Path for ENV_VAR 'PRIVATE_KEY_PATH' does not exist";
    }
    if (!fs.existsSync(getEnvVar('CERTIFICATE_PATH') ?? '')) {
      throw "Path for ENV_VAR 'CERTIFICATE_PATH' does not exist";
    }
    return {
      key: fs.readFileSync(getEnvVar('PRIVATE_KEY_PATH') ?? ''),
      cert: fs.readFileSync(getEnvVar('CERTIFICATE_PATH') ?? ''),
    };
  }

  public start(host: string, port: number): void {
    const httpsOptions = Server.getHttpsOptions();
    if (httpsOptions.cert.length && httpsOptions.key.length) {
      createHttpsServer(Server.getHttpsOptions(), this.app).listen(port, host, () =>
        Logger.info(`Listening on ${host}:${port} per HTTPS`),
      );
    } else {
      createHttpServer(this.app).listen(port, host, () => Logger.info(`Listening on ${host}:${port} per HTTP`));
    }
  }
}

export default Server;
