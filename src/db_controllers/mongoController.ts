import {Express, Request, Response} from 'express';
import { MongoDAO } from '../dao/mongoDAO';
import * as mongo_data from '../db_data/mongo_data.json';
import * as fs from 'fs';
import { textChangeRangeIsUnchanged, toEditorSettings } from 'typescript';
import { RootQuerySelector } from 'mongoose';

export class MongoController {

    private dao: any = null;
    
    constructor() {

        this.dao = MongoDAO.withSchemaFromFile(); 
    }

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
    
    private getSchema(req: Request, res: Response): void {
        res.send(this.dao.getSchema());
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

    private async delete(req: Request, res: Response): Promise<void> {
        const result = await this.dao.delete(req.body);
        res.sendStatus(result ? 400 : 200);
    }

    private async update(req: Request, res: Response): Promise<void> {
        const result = await this.dao.update(req.body.query, req.body.data);
        res.sendStatus(result ? 400 : 200);
    }

    private setRoutes(app: Express): void {
        app.post("/mongo/add_data", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.addData(req, res);
        });

        app.post("/mongo/schema", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.setSchema(req, res);
        })
 
        app.get("/mongo/schema", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.getSchema(req, res);
        })      

        app.post("/mongo/write", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.write(req, res);
        });

        app.post('/mongo/find_one', (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.findOne(req, res);
        });

        app.post('/mongo/find_many', (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.findMany(req, res);
        })
    
        app.delete("/mongo/delete", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.delete(req, res);
        });

        app.put("/mongo/update", (req: Request, res: Response) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.update(req, res);
        });
        
    }

    public config(app: Express): Express {
        this.setRoutes(app);
        return app;
    }
}