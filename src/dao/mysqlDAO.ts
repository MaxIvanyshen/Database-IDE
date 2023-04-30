import * as mysql from 'mysql';
import * as mysql_data from '../db_data/mysql_data.json';
import { HighlightSpanKind } from 'typescript';
import { table } from 'console';

export class MySqlDAO {
    
    private readonly OK = 0;
    private readonly ERROR = 1;

    private data: any;
    private con: any;

    constructor(data: any) {
        this.data = data;
    }

    public async connect(): Promise<number> {
        this.con = mysql.createConnection(this.data.connection_data);
        let status = this.OK;
        this.con.connect((err: any) => {
            if(err) {
                status = this.ERROR;
                throw err;
            }
        });
        return status;
    }

    public async disconnect(): Promise<void> {
        this.con.end();
    }

    public async write(query: any): Promise<number> {
        let status = this.OK;

        await this.con.query(`INSERT INTO ${this.data.table} VALUES(?)`, [Object.values(query)]);
        return status;
    }

    public async findOne(query: any): Promise<any> {
        const queryStr = this.makeSelectionQueryStr(query);
        console.log(queryStr);
        let data: any = null;
        await this.con.query(queryStr, (err: any, rows: any) => {
            if(err) throw err;
            data = rows[0]; //not assigning
        });
        return data;
    }

    private makeSelectionQueryStr(query: any): string  {
        let queryStr = `SELECT * FROM ${this.data.table} WHERE `;
        const keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            queryStr += `${keys[i]} = '${query[keys[i]]}'`;
            if(i < keys.length - 1)
                queryStr += ' AND ';
            else 
                queryStr += ';';
        }
        return queryStr;
    }
}

const func = async () => {
    const dao = new MySqlDAO(mysql_data);
    console.log(await dao.connect());
    console.log(await dao.findOne({name: "Max", age: 16}));
}

func();