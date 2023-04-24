import * as postgres_data from '../db_data/postgres_data.json';
import { Client } from 'pg';

export class PostgresDAO {
  public readonly OK = 0;
  public readonly ERROR = 1;

  private postgres_data: any = null;
  private client: any = null;

  private schema: any = null;

  constructor(data?: object) {
    if(data != undefined) this.postgres_data = data;
    this.connectToDB();
  }

  public async connectToDB(): Promise<number> {
    this.client = new Client(postgres_data.connection_data);
    let status: number = 0;
    this.client.connect((err: any) => {
      if (err) {
        throw err;
        status = 1;
      };
    });
    return status;
  }

  public async write(data: Object): Promise<number> {
    if(this.schema == null)
      await this.parseSchema();

    let status = 0;
    await this.client.query(this.makeInsertionQueryStr(data)).catch((err: any) => {status = 1; console.log(err)})

    return status; 
  }

  public async findOne(query: any): Promise<any> {

    if(this.schema == null) 
     await this.parseSchema();
    
    const result = await this.client.query(this.makeSelectionQueryStr(query));
    return result.rows[0];
  }

  private makeInsertionQueryStr(query: any): string {
    let queryStr = `INSERT INTO ${this.postgres_data.table}(`;
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
    let queryStr = `SELECT * FROM ${this.postgres_data.table} WHERE `;
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
    let queryStr = `DELETE FROM ${this.postgres_data.table} WHERE `;
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

    let status = 0;
    await this.client.query(this.makeDeletionQueryStr(query)).catch((err: any) => {status = 1; console.log(err)});

    return status;
  }

  private async parseSchema(): Promise<void> {
    const result = await this.client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '${this.postgres_data.table}'
    `);

    this.schema = result.rows;
  }
}

const test = async () => {
  const dao = new PostgresDAO(postgres_data);
  console.log(await dao.connectToDB());
  console.log(await dao.delete({name: "Max", age: 16}));
}

test();