import {Express, Request, Response} from 'express';
import { MongoDAO } from '../dao/mongoDAO';
import * as postgres_data from '../db_data/postgres_data.json';
import * as fs from 'fs';
import { PostgresDAO } from '../dao/postgresDAO';
import { Http2ServerRequest } from 'http2';
import { textChangeRangeIsUnchanged } from 'typescript';

export class PostgresController {
    private dao: any = null;

    private addData(req: Request, res: Response): void {
        const data = req.body;
        this.writeDataToFile(data);
        res.sendStatus(200);
    }

    private writeDataToFile(data: object): void {
        fs.writeFileSync(`src/db_data/postgres_data.json`, JSON.stringify(data));
    }

    private async write(req: Request, res: Response) {
        if(this.dao == null)
            this.dao = new PostgresDAO(postgres_data);
        
        const resp = await this.dao.write(req.body);
        res.sendStatus(resp ? 401 : 200);
    }

    private async findOne(req: Request, res: Response): Promise<any> {
        if(this.dao == null)
            this.dao = new PostgresDAO(postgres_data);
        
        const foundData = await this.dao.findOne(req.body);
        res.send(foundData);
    }

    private async findMany(req: Request, res: Response): Promise<any> {
        if(this.dao == null)
            this.dao = new PostgresDAO(postgres_data);
        
        const foundData = await this.dao.findMany(req.body);
        res.send(foundData);
    }

    private async delete(req: Request, res: Response): Promise<any> {
        if(this.dao == null)
            this.dao = new PostgresDAO(postgres_data);

        const result = await this.dao.delete(req.body);
        res.sendStatus(result ? 401 : 200);
    }

    private setRoutes(app: Express): void {
        app.post("/postgres/add_data", (req: Request, res: Response) => {
            this.addData(req, res);
        });

        app.post("/postgres/write", (req: Request, res: Response) => {
            this.write(req, res);
        });

        app.get("/postgres/find_one", (req: Request, res: Response) => {
            this.findOne(req, res);
        });
        
        app.get("/postgres/find_many", (req: Request, res: Response) => {
            this.findMany(req, res);
        });

        app.delete("/postgres/delete", (req: Request, res: Response) => {
            this.delete(req, res);
        });
    }

    public config(app: Express): Express {
        this.setRoutes(app);
        return app;
    }
}