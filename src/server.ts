import express, {Express, Request, Response} from 'express';
import { Controller } from './controller';
import { MongoController } from './mongoController';

export class Server {
    private app: Express;
    private PORT = 8000;

    private mongoController: Controller;

    constructor() {
        this.app = express();
        this.mongoController = new MongoController();
        this.config();
    }

    private config(): void {
        this.mongoController.config(this.app);

    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log("listening on port " + this.PORT);
        });
    }
}

const server: Server = new Server();
server.start();