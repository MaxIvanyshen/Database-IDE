"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoWriteResponse = exports.MongoDAO = void 0;
const mongo_data = __importStar(require("../db_data/mongo_data.json"));
const mongoose_1 = __importStar(require("mongoose"));
;
class MongoDAO {
    constructor(schema) {
        this.OK = 0;
        this.ERROR = 1;
        this.connectToDB();
        this.setSchema(schema);
    }
    static withSchemaFromFile() {
        return new MongoDAO(mongo_data.schema);
    }
    setSchema(schema) {
        const userSchema = new mongoose_1.Schema(schema);
        this.UserCollection = (0, mongoose_1.model)(mongo_data.DB_COLLECTION, userSchema, mongo_data.DB_COLLECTION);
    }
    getSchema() {
        return this.UserCollection.schema.obj;
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, mongoose_1.connect)(mongo_data.DB_CONN_STRING.replace("<db_name>", mongo_data.DB_NAME).replace("<password>", mongo_data.password))
                .catch(err => { console.log(err); return this.ERROR; });
            return this.OK;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.connection.close().catch(err => { console.log(err); return this.ERROR; });
            return this.OK;
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new this.UserCollection(data);
            yield obj.save().catch((err) => { console.log(err); }).then(() => console.log("saved!"));
            return new MongoWriteResponse(obj._id, this.OK);
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserCollection.findOne(query).exec();
            return user;
        });
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.UserCollection.find().where(query).exec();
            return users;
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = this.OK;
            yield this.UserCollection.findOneAndRemove(query).exec().catch((err) => { status = this.ERROR; console.log(err); });
            return status;
        });
    }
    update(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = this.OK;
            yield this.UserCollection.findOneAndUpdate(query, data).exec().catch((err) => { status = this.ERROR; console.log(err); });
            return status;
        });
    }
}
exports.MongoDAO = MongoDAO;
class MongoWriteResponse {
    constructor(id, status) {
        this._id = id;
        this.status = status;
    }
}
exports.MongoWriteResponse = MongoWriteResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQU8uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYW8vbW9uZ29EQU8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBeUQ7QUFDekQscURBQStFO0FBSzlFLENBQUM7QUFFRixNQUFhLFFBQVE7SUFNakIsWUFBWSxNQUFlO1FBTFgsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLFVBQUssR0FBRyxDQUFDLENBQUM7UUFLdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxrQkFBa0I7UUFDNUIsT0FBTyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUEwQjtRQUN2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQWEsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFBLGdCQUFLLEVBQWEsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVZLFdBQVc7O1lBQ3BCLElBQUEsa0JBQU8sRUFBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNqSCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMs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