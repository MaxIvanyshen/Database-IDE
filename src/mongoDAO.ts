import * as mongo_data from './db_data/mongo_data.json';
import mongoose, { Schema, model, connect, Model, connection } from 'mongoose';

interface UserObject {
};

export class MongoDAO {
    public readonly OK = 0;
    public readonly ERROR = 1;

    private UserCollection;

    constructor(schema: object) {
        this.connectToDB();
        const userSchema = new Schema<UserObject>(schema)
        this.UserCollection = model<UserObject>('data', userSchema, mongo_data.DB_COLLECTION);    
    }

    public async connectToDB(): Promise<number> {
        connect(mongo_data.DB_CONN_STRING.replace("<db_name>", mongo_data.DB_NAME).replace("<password>", mongo_data.password))
            .catch(err => {console.log(err)});
        return this.OK;
    }    

    public async write(data: UserObject): Promise<MongoWriteResponse> {
        const obj = new this.UserCollection(data); 
        await obj.save().catch(err => {console.log(err)}).then(() => console.log("saved!"));
        return new MongoWriteResponse((obj as mongoose.Document)._id, this.OK);
    }

    public async findOne(query: object): Promise<any> {
        const user = await this.UserCollection.findOne(query).exec();
        return user;
    }

    public async findMany(query: any): Promise<any> {
        const users = await this.UserCollection.find().where(query).exec();
        return users;
    }
}

export class MongoWriteResponse {
    public _id: mongoose.Types.ObjectId;
    public status: number;

    constructor(id: mongoose.Types.ObjectId, status: number) {
        this._id = id;
        this.status = status;
    }
}

// const test = async() => {
//     const schema = {
//             name: {type: String, required: true},
//             occupation: {type: String, required: true}
//     }
//     const dao: MongoDAO = new MongoDAO(schema);
//     console.log(await dao.connectToDB());
//     console.log(await dao.write({name: "Max Ivanyshen", occupation: "Student"}));
// }

// test();
