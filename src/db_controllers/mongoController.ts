import {Express, Request, Response} from 'express';
import { MongoDAO } from '../dao/mongoDAO';
import * as fs from 'fs';

export class MongoController {

    private dao: any = null;

    private addData(req: Request, res: Response): void {
        const mongo_data: object = req.body;
        fs.writeFileSync(`${__dirname}/db_data/mongo_data.json`, JSON.stringify(mongo_data));
        res.sendStatus(200);
    }

    private setSchema(req: Request, res: Response): void {
        const schema = req.body;
        this.dao = new MongoDAO(schema);
        res.sendStatus(200);
    }

    private async write(req: Request, res: Response): Promise<void> {
        const resp = await this.dao.write(req.body);
        res.send(resp);
    }

    private async findOne(req:  Request, res: Response): Promise<void> {
        const query = req.body;
        const found = await this.dao.findOne(query);
        res.send(found);
    }

    private async findMany(req: Request, res: Response): Promise<void> {
        const query = req.body;
        const found = await this.dao.findMany(query);
        res.send(found);
    }

    private setRoutes(app: Express): void {
        app.post("/mongo/add_data", (req: Request, res: Response) => {
            this.addData(req, res);
        });

        app.post("/mongo/set_schema", (req: Request, res: Response) => {
            this.setSchema(req, res);
        })

        app.post("/mongo/write", (req: Request, res: Response) => {
            this.write(req, res);
        });

        app.get('/mongo/find_one', (req: Request, res: Response) => {
            this.findOne(req, res);
        });

        app.get('/mongo/find_many', (req: Request, res: Response) => {
            this.findMany(req, res);
        })
    }

    public config(app: Express): Express {
        this.setRoutes(app);
        return app;
    }
}