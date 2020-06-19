import * as express from 'express';
import apiRoutes from './routes';
import * as path from 'path';
import * as bodyParser from 'body-parser';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling()
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  private initializeControllers(): void {
    // Define the routes
    this.app.use('/api', apiRoutes);
    console.debug(`Add ${apiRoutes.stack.length} API routes to server`);
    if (process.env.NODE_ENV === 'production') {
      console.log('Start server in production mode');
      this.serveFrontend();
    } else {
      console.log('Start server in development mode');
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(function errorMiddleware(error: any, request: express.Request, response: express.Response) {
      const status = error.status || 500;
      const message = error.message || 'Something went wrong';
      response
        .status(status)
        .send({
          status,
          message,
        })
    })
  }

  private serveFrontend(): void {
    const dir = path.join(__dirname, 'public/client/');
    // Set the static and views directory
    this.app.set('views',  dir);
    this.app.use(express.static(dir));
    // Serve front-end content
    this.app.get('*', (req, res) => {
      res.sendFile('index.html', {root: dir});
    });
  }

  public start(host: string, port: number): void {
    this.app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
  }
}

export default Server;
