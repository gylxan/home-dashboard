import * as express from 'express';
import controllers from './controllers';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Error } from './interfaces/error';
import { isProductionEnvironment } from './helpers/environment';
import { NextFunction } from 'express';

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
    console.debug(`Add ${controllers.stack.length} API controllers to server`);
    if (isProductionEnvironment()) {
      console.log('Start server in production mode');
      this.serveFrontend();
    } else {
      console.log('Start server in development mode');
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
