import * as mongo_data from './db_data/mongo_data.json';
import mongoose, { Schema, model, connect, Model, connection } from 'mongoose';

interface IUser {
    name: string,
    surname: string,
    age: number
};

export class MongoDAO {
    public readonly OK = 0;
    public readonly ERROR = 1;

    private User;

    constructor() {
        this.connectToDB();
        const userSchema = new Schema<IUser>({
            name: {type: String, required: true},
            surname: {type: String, required: true},
            age: {type: Number, required: true}
        })
        this.User = model<IUser>('users', userSchema, mongo_data.DB_COLLECTION);    
    }

    public async connectToDB(): Promise<number> {
        connect(mongo_data.DB_CONN_STRING.replace("<db_name>", mongo_data.DB_NAME).replace("<password>", mongo_data.password))
            .catch(err => {console.log(err)});
        return this.OK;
    }    

    public async write(data: IUser): Promise<MongoWriteResponse> {
        const user = new this.User(data); 
        await user.save().catch(err => {console.log(err)}).then(() => console.log("saved!"));
        return new MongoWriteResponse(user._id, this.OK);
    }

    public async findOne(query: object): Promise<any> {
        const user = await this.User.findOne(query).exec();
        return user;
    }

    public async findMany(query: any): Promise<any> {
        const users = await this.User.find().where(query).exec();
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

const test = async() => {
    const dao: MongoDAO = new MongoDAO();
    console.log(await dao.connectToDB());
    const foundUser = await dao.findMany({age: 17});
    console.log(foundUser);
}

test();
