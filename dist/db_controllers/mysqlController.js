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
exports.MySqlController = void 0;
const mysql_data = __importStar(require("../db_data/mysql_data.json"));
const mysqlDAO_1 = require("../dao/mysqlDAO");
const fs = __importStar(require("fs"));
const sqlQueryConstructor_1 = require("../dao/sqlQueryConstructor");
const schemaConverter_1 = require("../dao/schemaConverter");
class MySqlController {
    constructor() {
        this.dao = null;
        this.dbCon = null;
        this.dao = new mysqlDAO_1.MySqlDAO(mysql_data);
        this.dbCon = this.dao.connect();
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = sqlQueryConstructor_1.SqlQueryConstructor.makeSelectionQueryStr(req.body, mysql_data.table);
            this.dbCon.query(query, (err, rows) => {
                if (err)
                    res.sendStatus(404);
                res.send(rows[0]);
            });
        });
    }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = sqlQueryConstructor_1.SqlQueryConstructor.makeSelectionQueryStr(req.body, mysql_data.table);
            this.dbCon.query(query, (err, rows) => {
                if (err)
                    res.sendStatus(404);
                res.send(rows);
            });
        });
    }
    write(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.dao.write(req.body);
            res.sendStatus(result ? 200 : 400);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.dao.update(req.body.query, req.body.data);
            res.sendStatus(result ? 200 : 400);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.dao.delete(req.body);
            res.sendStatus(result ? 200 : 400);
        });
    }
    addData(req, res) {
        const data = req.body;
        this.writeDataToFile(data);
        res.sendStatus(200);
    }
    writeDataToFile(data) {
        fs.writeFileSync(`src/db_data/mysql_data.json`, JSON.stringify(data));
    }
    getSchema(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbCon.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = '${mysql_data.table}'
        `, (err, rows) => { res.send(schemaConverter_1.SchemaConverter.convert(rows)); });
        });
    }
    setRoutes(app) {
        app.post("/mysql/set_data", (req, res) => {
            this.addData(req, res);
        });
        app.get("/mysql/find_one", (req, res) => {
            this.findOne(req, res);
        });
        app.post("/mysql/find_many", (req, res) => {
            this.findMany(req, res);
        });
        app.post("/mysql/write", (req, res) => {
            this.write(req, res);
        });
        app.put("/mysql/update", (req, res) => {
            this.update(req, res);
        });
        app.delete("/mysql/delete", (req, res) => {
            this.delete(req, res);
        });
        app.get("/mysql/schema", (req, res) => {
            this.getSchema(req, res);
        });
    }
    config(app) {
        this.setRoutes(app);
        return app;
    }
}
exports.MySqlController = MySqlController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWxDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZGJfY29udHJvbGxlcnMvbXlzcWxDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUVBQXlEO0FBRXpELDhDQUEyQztBQUMzQyx1Q0FBeUI7QUFDekIsb0VBQWlFO0FBQ2pFLDREQUF5RDtBQUV6RCxNQUFhLGVBQWU7SUFLeEI7UUFIUSxRQUFHLEdBQVEsSUFBSSxDQUFDO1FBQ2hCLFVBQUssR0FBUSxJQUFJLENBQUM7UUFHdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLG1CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFYSxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQzdDLE1BQU0sS0FBSyxHQUFHLHlDQUFtQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtnQkFDNUMsSUFBRyxHQUFHO29CQUNGLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFFYSxRQUFRLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQzlDLE1BQU0sS0FBSyxHQUFHLHlDQUFtQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxD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