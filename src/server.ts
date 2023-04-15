import express, {Express, Request, Response} from 'express';
import { DbController } from './db_controllers/controller';
import { MongoController } from './db_controllers/mongoController';

export class Server {
    private app: Express;
    private PORT = 8000;

    private mongoController: DbController;

    constructor() {
        this.app = express();
        this.mongoController = new MongoController();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.mongoController.config(this.app);
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`listening on port ${this.PORT}`);
        });
    }
}

const server: Server = new Server();
server.start();