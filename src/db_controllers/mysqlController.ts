import * as mysql from 'mysql';
import * as mysql_data from '../db_data/mysql_data.json';
import {Express, Response, Request} from 'express';
import { MySqlDAO } from '../dao/mysqlDAO';
import * as fs from 'fs';
import { SqlQueryConstructor } from '../dao/sqlQueryConstructor';

export class MySqlController {

    private dao: any = null;
    private dbCon: any = null;

    constructor() {
        this.dao = new MySqlDAO(mysql_data);
        this.dbCon = this.dao.connect();
    }

    private async findOne(req: Request, res: Response): Promise<void> {
        const query = SqlQueryConstructor.makeSelectionQueryStr(req.body, mysql_data.table);
        this.dbCon.query(query, (err: any, rows: any) => {
            if(err)
                res.sendStatus(404);
            res.send(rows[0]);
        }); 
    }

    private async findMany(req: Request, res: Response): Promise<void> {
        const query = SqlQueryConstructor.makeSelectionQueryStr(req.body, mysql_data.table);
        this.dbCon.query(query, (err: any, rows: any) => {
            if(err)
                res.sendStatus(404);
            res.send(rows);
        });
    }

    private async write(req: Request, res: Response): Promise<void> {
        const result = this.dao.write(req.body);
        res.sendStatus(result ? 200 : 400);
    }

    private async update(req: Request, res: Response): Promise<void> {
        const result = this.dao.update(req.body.query, req.body.data);
        res.sendStatus(result ? 200 : 400);
    }

    private async delete(req: Request, res: Response): Promise<any> {
        const result = this.dao.delete(req.body);
        res.sendStatus(result ? 200 : 400);
    }

    private addData(req: Request, res: Response): void {
        const data = req.body;
        this.writeDataToFile(data);
        res.sendStatus(200);
    }

    private writeDataToFile(data: object): void {
        fs.writeFileSync(`src/db_data/mysql_data.json`, JSON.stringify(data));
    }

    private setRoutes(app: Express): void {

        app.post("/mysql/set_data/", (req: Request, res: Response) => {
            this.addData(req, res);
        });

        app.get("/mysql/find_one/", (req: Request,res: Response) => {
            this.findOne(req, res);
        });

        app.get("/mysql/find_many/", (req: Request, res: Response) => {
            this.findMany(req, res);
        });
        
        app.post("/mysql/write/", (req: Request, res: Response) => {
            this.write(req, res);
        });

        app.put("/mysql/update/", (req: Request, res: Response) => {
            this.update(req, res);
        });

        app.delete("/mysql/delete/", (req: Request, res: Response) => {
            this.delete(req, res);
        });

    }

    public config(app: Express): Express {
        this.setRoutes(app);
        return app;
    }
}