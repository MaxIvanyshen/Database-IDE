import express, {Express, Request, Response} from 'express';
import { DbController } from './db_controllers/controller';
import { MongoController } from './db_controllers/mongoController';
import { PostgresController } from './db_controllers/postgresController';

export class Server {
    private app: Express;
    private PORT = 8000;

    private mongoController: DbController;
    private postgresController: DbController;

    constructor() {
        this.app = express();
        this.mongoController = new MongoController();
        this.postgresController = new PostgresController();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.mongoController.config(this.app);
        this.postgresController.config(this.app);
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`listening on port ${this.PORT}`);
        });
    }
}

const server: Server = new Server();
server.start();