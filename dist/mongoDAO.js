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
const mongo_data = __importStar(require("./db_data/mongo_data.json"));
const mongoose_1 = __importStar(require("mongoose"));
;
class MongoDAO {
    constructor(schema) {
        this.OK = 0;
        this.ERROR = 1;
        this.connectToDB();
        const userSchema = new mongoose_1.Schema(schema);
        this.UserCollection = (0, mongoose_1.model)('data', userSchema, mongo_data.DB_COLLECTION);
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
            yield obj.save().catch(err => { console.log(err); }).then(() => console.log("saved!"));
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
}
exports.MongoDAO = MongoDAO;
class MongoWriteResponse {
    constructor(id, status) {
        this._id = id;
        this.status = status;
    }
}
exports.MongoWriteResponse = MongoWriteResponse;
// const test = async() => {
//     const schema = {
//             name: {type: String, required: true},
//             occupation: {type: String, required: true}
//     }
//     const dao: MongoDAO = new MongoDAO(schema);
//     console.log(await dao.connectToDB());
//     // console.log(await dao.write({name: "Max Ivanyshen", occupation: "Student"}));
//     console.log(await dao.findOne({occupation: "Student"}));
//     console.log(await dao.disconnect());
//     console.log(await dao.findOne({occupation: "Student"}));
// }
// test();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQU8uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb25nb0RBTy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUF3RDtBQUN4RCxxREFBK0U7QUFHOUUsQ0FBQztBQUVGLE1BQWEsUUFBUTtJQU1qQixZQUFZLE1BQWU7UUFMWCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUt0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFhLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBQSxnQkFBSyxFQUFhLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFWSxXQUFXOztZQUNwQixJQUFBLGtCQUFPLEVBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDakgsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNuQixrQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUE7WUFDaEYsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVZLEtBQUssQ0FBQyxJQUFnQjs7WUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8sSUFBSSxrQkFBa0IsQ0FBRSxHQUF5QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLEtBQWE7O1lBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFDLEtBQVU7O1lBQzVCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkUsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0o7QUF0Q0QsNEJBc0NDO0FBRUQsTUFBYSxrQkFBa0I7SUFJM0IsWUFBWSxFQUEyQixFQUFFLE1BQWM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFSRCxnREFRQztBQUVELDRCQUE0QjtBQUM1Qix1QkFBdUI7QUFDdkIsb0RBQW9EO0FBQ3BELHlEQUF5RDtBQUN6RCxRQUFRO0FBQ1Isa0RBQWtEO0FBQ2xELDRDQUE0QztBQUM1Qyx1RkFBdUY7QUFDdkYsK0RBQStEO0FBQy9ELDJDQUEyQztBQUMzQywrREFBK0Q7QUFDL0QsSUFBSTtBQUVKLFVBQVUifQ==