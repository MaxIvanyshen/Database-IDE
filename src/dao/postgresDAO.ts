import * as postgres_data from '../db_data/postgres_data.json';
import { Client } from 'pg';
import { SqlQueryConstructor } from './sqlQueryConstructor';
import { SchemaConverter } from './schemaConverter';

export class PostgresDAO {
  public readonly OK = 0;
  public readonly ERROR = 1;

  private data: any = null;
  private client: any = null;

  private schema: any = null;

  constructor(data?: object) {
    if(data != undefined) this.data = data;
    this.connectToDB();
  }

  public async connectToDB(): Promise<number> {
    this.client = new Client(this.data.connection_data);
    let status: number = 0;
    this.client.connect((err: any) => {
      if (err) {
        throw err;
        status = this.ERROR;
      };
    });
    return status;
  }

  public async write(data: Object): Promise<number> {
    if(this.schema == null)
      await this.getSchema();

    let status = this.OK;
    await this.client.query(SqlQueryConstructor.makeInsertionQueryStr(data, this.data.table)).catch((err: any) => {status = this.ERROR; console.log(err)})

    return status; 
  }

  public async findOne(query: any): Promise<any> {

    if(this.schema == null) 
      await this.getSchema();
    
    const result = await this.client.query(SqlQueryConstructor.makeSelectionQueryStr(query, this.data.table));
    return result.rows[0];
  } 

  public async findMany(query: any): Promise<any> {
    if(this.schema == null) 
      await this.getSchema();
    let queryStr = SqlQueryConstructor.makeSelectionQueryStr(query, this.data.table);
    const result = await this.client.query(queryStr);
    return result.rows;
  }

  public async delete(query: any): Promise<number> {
    if(this.schema == null)
      await this.getSchema();

    let status = this.OK;
    await this.client.query(SqlQueryConstructor.makeDeletionQueryStr(query, this.data.table)).catch((err: any) => {status = this.ERROR; console.log(err)});

    return status;
  }

  public async update(query: any, data: any): Promise<number> {
    if(this.schema == null)
      await this.getSchema();
   
    let status = this.OK;
    await this.client.query(SqlQueryConstructor.makeUpdateQueryStr(query, data, this.data.table)).catch((err: any) => {status = this.ERROR; console.log(err)});

    return status;
  }

  private async getSchema(): Promise<void> {
    const result = await this.client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '${this.data.table}'
    `);

    this.schema = result.rows;
    return SchemaConverter.convert(this.schema);
  }
}
