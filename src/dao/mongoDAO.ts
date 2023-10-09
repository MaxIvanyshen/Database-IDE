import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import * as mongo_data from '../db_data/mongo_data.json';
import mongoose, { Schema, model, connect, Model, connection } from 'mongoose';
import { setMaxIdleHTTPParsers } from 'http';
import { UnorderedBulkOperation } from 'mongodb';

interface UserObject {
};

export class MongoDAO {
    public readonly OK = 0;
    public readonly ERROR = 1;

    private UserCollection: any;

    constructor(schema?: object) {
        this.connectToDB();
        this.setSchema(schema);
    }

    public static withSchemaFromFile(): MongoDAO {
        return new MongoDAO(mongo_data.schema);
    }

    public setSchema(schema: object | undefined): void {
        const userSchema = new Schema<UserObject>(schema);
        this.UserCollection = model<UserObject>(mongo_data.DB_COLLECTION, userSchema, mongo_data.DB_COLLECTION);  
    }

    public getSchema(): any {
        return this.UserCollection.schema.obj;
    }

    public async connectToDB(): Promise<number> {
        connect(mongo_data.DB_CONN_STRING.replace("<db_name>", mongo_data.DB_NAME).replace("<password>", mongo_data.password))
            .catch(err => {console.log(err); return this.ERROR});
        return this.OK;
    }    

    public async disconnect(): Promise<number> {
        mongoose.connection.close().catch(err => {console.log(err); return this.ERROR;})
        return this.OK;
    }

    public async write(data: UserObject): Promise<MongoWriteResponse> {
        const obj = new this.UserCollection(data); 
        await obj.save().catch((err: any) => {console.log(err)}).then(() => console.log("saved!"));
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

    public async delete(query: any): Promise<number> {
        let status = this.OK; 
        await this.UserCollection.findOneAndRemove(query).exec().catch((err: any) => {status = this.ERROR; console.log(err)});
        return status;
    }

    public async update(query: any, data: any): Promise<number> {
        let status = this.OK;
        await this.UserCollection.findOneAndUpdate(query, data).exec().catch((err: any) => {status = this.ERROR; console.log(err)});
        return status;
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
