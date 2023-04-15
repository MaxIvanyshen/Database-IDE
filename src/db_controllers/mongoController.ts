import {Express, Request, Response} from 'express';
import { MongoDAO } from '../dao/mongoDAO';
import * as mongo_data from '../db_data/mongo_data.json';
import * as fs from 'fs';

export class MongoController {

    private dao: any = null;

    private addData(req: Request, res: Response): void {
        const mongo_data: object = req.body;
        this.writeDataToFile(mongo_data);
        res.sendStatus(200);
    }

    private writeDataToFile(mongo_data: object): void {
        fs.writeFileSync(`src/db_data/mongo_data.json`, JSON.stringify(mongo_data));
    }

    private setSchema(req: Request, res: Response): void {
        const schema = req.body;
        let new_mongo_data = {
            DB_CONN_STRING: mongo_data.DB_CONN_STRING,
            DB_NAME: mongo_data.DB_NAME,
            DB_COLLECTION: mongo_data.DB_COLLECTION,
            username: mongo_data.username,
            password: mongo_data.password,
            schema: schema
        }
        this.writeDataToFile(new_mongo_data);
        this.dao = new MongoDAO(schema);
        res.sendStatus(200);
    }

    private async write(req: Request, res: Response): Promise<void> {
        if(this.dao == null) this.dao = MongoDAO.withSchemaFromFile(); 
        const resp = await this.dao.write(req.body);
        res.send(resp);
    }

    private async findOne(req:  Request, res: Response): Promise<void> {
        if(this.dao == null) this.dao = MongoDAO.withSchemaFromFile(); 
        const query = req.body;
        const found = await this.dao.findOne(query);
        res.send(found);
    }

    private async findMany(req: Request, res: Response): Promise<void> {
        if(this.dao == null) this.dao = MongoDAO.withSchemaFromFile(); 
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