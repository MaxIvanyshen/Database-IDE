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

    public connectToDB(): number {
        connect(mongo_data.DB_CONN_STRING.replace("<db_name>", mongo_data.DB_NAME).replace("<password>", mongo_data.password))
            .catch(err => {return this.ERROR});
        return this.OK;
    }    

    public write(data: IUser): MongoWriteResponse {
        const user = new this.User(data); 
        user.save().catch(err => {return this.ERROR}).then(() => console.log("saved!"));
        return new MongoWriteResponse(user._id, this.OK);
    }

    public async findOne(query: object): Promise<any> {
        const user = await this.User.findOne(query).exec();
        return user;
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

const test = async () => {
    const dao: MongoDAO = new MongoDAO();
    const id = dao.write({"name": "Max", "surname": "Ivanyshen", "age": 17})._id;
    const foundUser = await dao.findOne({_id: id});
    console.log("found user: " + foundUser);
}

test();
