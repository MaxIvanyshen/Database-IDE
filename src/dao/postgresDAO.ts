import { NamespaceBody, collapseTextChangeRangesAcrossMultipleVersions, isNamedExportBindings, toEditorSettings } from "typescript";
import * as postgres_data from '../db_data/postgres_data.json';
import { Client } from 'pg';



// async function insert() {
//     const [name, age]  = ["Max", 16];
//     const res = await  client.query("INSERT INTO data(name, age) VALUES($1, $2);", [name, age]);
//     console.log("added data to db!");
// }

// insert();

export class PostgresDAO {
  public readonly OK = 0;
  public readonly ERROR = 1;

  private data: any = null;
  private client: any = null;

  private schema: any = null;

  constructor(data?: object) {
    if(data != undefined) this.data = data;
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

  public async findOne(query: object): Promise<any> {
    if(this.schema == null) await this.parseSchema();
    const fields = Object.getOwnPropertyNames(query);
    let queryStr = `SELECT * FROM ${postgres_data.table} WHERE `;
    fields.forEach((val) => {
      queryStr += `${val} = ${query.val}` //TODO: need to understand how to add fields automatically here, cuz query doesn't have a value named `val`
    });
  }

  private async parseSchema(): Promise<void> {
    this.schema = await this.client
      .query(`SELECT * FROM ${postgres_data.table}`)
      .then(function(res: any) {return Object.getOwnPropertyNames(res.rows[0])});    
  }
}

const test = async () => {
  const dao = new PostgresDAO(postgres_data);
  console.log(await dao.connectToDB());
}

test();