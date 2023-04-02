import * as mongo_data from './db_data/mongo_data.json';
import * as mongoDB from 'mongodb';


export const collections: { data?: mongoDB.Collection } = {}

export class MongoDAO {
    public static readonly OK = 0;
    public static readonly ERROR = 1;

    public static connectToDB(): number {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(mongo_data.DB_CONN_STRING.replace("<password>", mongo_data.password));
       
        try {
             client.connect();
        } catch(err) {
            return this.ERROR;
        }
    
        const db: mongoDB.Db = client.db(mongo_data.DB_NAME);
        const collection = db.collection(mongo_data.DB_COLLECTION);
    
        collections.data = collection;

        console.log("Successfully connected!");
        return this.OK;
    }  
    
    public static write(data: any): number {

        try {
            collections.data?.insertOne(data);
        } catch (err) {
            return this.ERROR;
        }

        return this.OK;

    }

    public static async findOne(query: any): Promise<any> {
        const foundData = collections.data?.findOne(query).then((res) => res?.json()).then(data => {return data});
        return foundData;
    }
}

const printResponse = () => {
    MongoDAO.findOne({"name": "Max"}).then(res => console.log(res));
}

printResponse(); 
