import * as mysql from 'mysql';
import * as mysql_data from '../db_data/mysql_data.json';
import { HighlightSpanKind } from 'typescript';
import { table } from 'console';
import { AnyBulkWriteOperation } from 'mongodb';
import { SqlQueryConstructor } from './sqlQueryConstructor';

export class MySqlDAO {
    
    private readonly OK = 0;
    private readonly ERROR = 1;

    private data: any;
    private con: any;

    constructor(data: any) {
        this.data = data;
    }

    public connect(): mysql.Connection {
        this.con = mysql.createConnection(this.data.connection_data);
        let status = this.OK;
        this.con.connect((err: any) => {
            if(err) {
                throw err;
            }
        });
        return this.con;
    }

    public async disconnect(): Promise<void> {
        this.con.end();
    }

    public async write(query: any): Promise<number> {
        let status = this.OK;
        try {
            await this.con.query(SqlQueryConstructor.makeInsertionQueryStr(query, this.data.table));
        } catch(err: any) {
            console.log(err);
            status = this.ERROR;
        }
        return status;
    } 

    public async delete(query: any): Promise<number> {
        let status = this.OK;
        try {
            await this.con.query(SqlQueryConstructor.makeDeletionQueryStr(query, this.data.table));
        } catch(err: any) {
            console.log(err);
            status = this.ERROR;
        }
        return status;
    }

    public async update(query: any, data: any): Promise<number> {
        let status = this.OK;
        try {
            await this.con.query(SqlQueryConstructor.makeUpdateQueryStr(query, data, this.data.table));
        } catch(err: any) {
            console.log(err);
            status = this.ERROR;
        }
        return status;
    }
    
    
}
