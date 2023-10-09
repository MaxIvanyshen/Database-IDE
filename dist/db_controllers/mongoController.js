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
exports.MongoController = void 0;
const mongoDAO_1 = require("../dao/mongoDAO");
const mongo_data = __importStar(require("../db_data/mongo_data.json"));
const fs = __importStar(require("fs"));
class MongoController {
    constructor() {
        this.dao = null;
        this.dao = mongoDAO_1.MongoDAO.withSchemaFromFile();
    }
    addData(req, res) {
        const mongo_data = req.body;
        this.writeDataToFile(mongo_data);
        res.sendStatus(200);
    }
    writeDataToFile(mongo_data) {
        fs.writeFileSync(`src/db_data/mongo_data.json`, JSON.stringify(mongo_data));
    }
    setSchema(req, res) {
        const schema = req.body;
        let new_mongo_data = {
            DB_CONN_STRING: mongo_data.DB_CONN_STRING,
            DB_NAME: mongo_data.DB_NAME,
            DB_COLLECTION: mongo_data.DB_COLLECTION,
            username: mongo_data.username,
            password: mongo_data.password,
            schema: schema
        };
        this.writeDataToFile(new_mongo_data);
        this.dao = new mongoDAO_1.MongoDAO(schema);
        res.sendStatus(200);
    }
    getSchema(req, res) {
        res.send(this.dao.getSchema());
    }
    write(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.dao.write(req.body);
            res.send(resp);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.body;
            const found = yield this.dao.findOne(query);
            res.send(found);
        });
    }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.body;
            const found = yield this.dao.findMany(query);
            res.send(found);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dao.delete(req.body);
            res.sendStatus(result ? 400 : 200);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dao.update(req.body.query, req.body.data);
            res.sendStatus(result ? 400 : 200);
        });
    }
    setRoutes(app) {
        app.post("/mongo/add_data", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.addData(req, res);
        });
        app.post("/mongo/schema", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.setSchema(req, res);
        });
        app.get("/mongo/schema", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.getSchema(req, res);
        });
        app.post("/mongo/write", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.write(req, res);
        });
        app.post('/mongo/find_one', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.findOne(req, res);
        });
        app.post('/mongo/find_many', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.findMany(req, res);
        });
        app.delete("/mongo/delete", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.delete(req, res);
        });
        app.put("/mongo/update", (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            this.update(req, res);
        });
    }
    config(app) {
        this.setRoutes(app);
        return app;
    }
}
exports.MongoController = MongoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZGJfY29udHJvbGxlcnMvbW9uZ29Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTJDO0FBQzNDLHVFQUF5RDtBQUN6RCx1Q0FBeUI7QUFJekIsTUFBYSxlQUFlO0lBSXhCO1FBRlEsUUFBRyxHQUFRLElBQUksQ0FBQztRQUlwQixJQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU8sT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3ZDLE1BQU0sVUFBVSxHQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxlQUFlLENBQUMsVUFBa0I7UUFDdEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUN6QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksY0FBYyxHQUFHO1lBQ2pCLGNBQWMsRUFBRSxVQUFVLENBQUMsY0FBYztZQUN6QyxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87WUFDM0IsYUFBYSxFQUFFLFVBQVUsQ0FBQyxhQUFhO1lBQ3ZDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtZQUM3QixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7WUFDN0IsTUFBTSxFQUFFLE1BQU07U0FDakIsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsY0FB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