import * as express from 'express';
import apiRoutes from './routes';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Error } from './interfaces/error';
import * as fs from 'fs';
import { isProductionEnvironment } from './helpers/environment';
import { Code, createError } from './helpers/error';

const DEFAULT_VERSION = 'develop';

const HEADER_CLIENT_VERSION = 'x-client-version';

class Server {
  private app: express.Application;
  private readonly version: string;

  constructor() {
    this.app = express();
    this.version = Server.getClientVersion();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // Add middleware to check for correct sent client version. When version is not correct, stop request and send error.
    this.app.use((req, res, next) => {
      const clientVersion = req.header(HEADER_CLIENT_VERSION);
      res.setHeader(HEADER_CLIENT_VERSION, this.version);
      if (!clientVersion || clientVersion !== this.version) {
        console.warn(
          `Invalid client version "${clientVersion}" received from "${req.ip}". Current server version: "${this.version}"`,
        );
        res.status(403);
        res.send(
          createError(
            Code.InvalidClientVersion,
            `Invalid client version "${clientVersion}". Current server version: "${this.version}"`,
          ),
        );
        return;
      }
      next();
    });
  }

  private static getClientVersion(): string {
    if (!isProductionEnvironment()) {
      return DEFAULT_VERSION;
    }

    const dir = path.join(__dirname, 'public/client/static/js/');
    let version = DEFAULT_VERSION;
    fs.readdirSync(dir).forEach((file) => {
      if (file.startsWith('main') && file.endsWith('.js')) {
        version = file.replace('main.', '').replace(/\..*$/, '');
      }
    });
    console.log(`Client version is: "${version}"`);
    return version;
  }

  private initializeControllers(): void {
    // Define the routes
    this.app.use('/api', apiRoutes);
    console.debug(`Add ${apiRoutes.stack.length} API routes to server`);
    if (isProductionEnvironment()) {
      console.log('Start server in production mode');
      this.serveFrontend();
    } else {
      console.log('Start server in development mode');
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(function errorMiddleware(error: Error, request: express.Request, response: express.Response) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      response.status(status).send({
        status,
        message,
      });
    });
  }

  private serveFrontend(): void {
    const dir = path.join(__dirname, 'public/client/');
    // Set the static and views directory
    this.app.set('views', dir);
    this.app.use(express.static(dir));
    // Serve front-end content
    this.app.get('*', (req, res) => {
      res.sendFile('index.html', { root: dir });
    });
  }

  public start(host: string, port: number): void {
    this.app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
  }
}

export default Server;
