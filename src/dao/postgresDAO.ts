import * as postgres_data from '../db_data/postgres_data.json';
import { Client } from 'pg';

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
      await this.parseSchema();

    let status = this.OK;
    await this.client.query(this.makeInsertionQueryStr(data)).catch((err: any) => {status = this.ERROR; console.log(err)})

    return status; 
  }

  public async findOne(query: any): Promise<any> {

    if(this.schema == null) 
     await this.parseSchema();
    
    const result = await this.client.query(this.makeSelectionQueryStr(query));
    return result.rows[0];
  }

  private makeInsertionQueryStr(query: any): string {
    let queryStr = `INSERT INTO ${this.data.table}(`;
    const keys = Object.keys(query);
    for(let i = 0; i < keys.length; i++) {
      queryStr += keys[i];
      if(i < keys.length - 1)
        queryStr += ', ';
      else 
        queryStr += ') VALUES (';
    }
    for(let i = 0; i < keys.length; i++) {
      queryStr += `'${query[keys[i]]}'`;
      if(i < keys.length - 1)
        queryStr += ', ';
      else 
        queryStr += ');';
    }
    return queryStr;
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

  private makeDeletionQueryStr(query: any): string {
    let queryStr = `DELETE FROM ${this.data.table} WHERE `;
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

  private makeUpdateQueryStr(query: any, data: any): string {
    let queryStr = `UPDATE ${this.data.table} SET `;
    const dataKeys = Object.keys(data);
    for (let i = 0; i < dataKeys.length; i++) {
      queryStr += `${dataKeys[i]} = '${data[dataKeys[i]]}'`;
      if(i < dataKeys.length - 1)
        queryStr += ', ';
      else 
        queryStr += ' WHERE ';
    }
    const queryKeys = Object.keys(query);
    for (let i = 0; i < queryKeys.length; i++) {
      queryStr += `${queryKeys[i]} = '${query[queryKeys[i]]}'`;
      if(i < queryKeys.length - 1)
        queryStr += ' AND ';
      else 
        queryStr += ';';
    }
    return queryStr;
  }

  public async findMany(query: any): Promise<any> {
    if(this.schema == null) 
      await this.parseSchema();
    let queryStr = this.makeSelectionQueryStr(query);
    const result = await this.client.query(queryStr);
    return result.rows;
  }

  public async delete(query: any): Promise<number> {
    if(this.schema == null)
      await this.parseSchema();

    let status = this.OK;
    await this.client.query(this.makeDeletionQueryStr(query)).catch((err: any) => {status = this.ERROR; console.log(err)});

    return status;
  }

  public async update(query: any, data: any): Promise<number> {
    if(this.schema == null)
      await this.parseSchema();
   
    let status = this.OK;
    await this.client.query(this.makeUpdateQueryStr(query, data)).catch((err: any) => {status = this.ERROR; console.log(err)});

    return status;
  }

  private async parseSchema(): Promise<void> {
    const result = await this.client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '${this.data.table}'
    `);

    this.schema = result.rows;
  }
}

const test = async () => {
  const dao = new PostgresDAO(postgres_data);
  console.log(await dao.connectToDB());
  console.log(await dao.update( {name: "Yarik", age: 17}, {name: "Max", age: 16}));
}

test();