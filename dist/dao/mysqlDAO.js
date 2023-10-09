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
exports.MySqlDAO = void 0;
const mysql = __importStar(require("mysql"));
const sqlQueryConstructor_1 = require("./sqlQueryConstructor");
class MySqlDAO {
    constructor(data) {
        this.OK = 0;
        this.ERROR = 1;
        this.data = data;
    }
    connect() {
        this.con = mysql.createConnection(this.data.connection_data);
        let status = this.OK;
        this.con.connect((err) => {
            if (err) {
                throw err;
            }
        });
        return this.con;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.con.end();
        });
    }
    write(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = this.OK;
            try {
                yield this.con.query(sqlQueryConstructor_1.SqlQueryConstructor.makeInsertionQueryStr(query, this.data.table));
            }
            catch (err) {
                console.log(err);
                status = this.ERROR;
            }
            return status;
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = this.OK;
            try {
                yield this.con.query(sqlQueryConstructor_1.SqlQueryConstructor.makeDeletionQueryStr(query, this.data.table));
            }
            catch (err) {
                console.log(err);
                status = this.ERROR;
            }
            return status;
        });
    }
    update(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = this.OK;
            try {
                yield this.con.query(sqlQueryConstructor_1.SqlQueryConstructor.makeUpdateQueryStr(query, data, this.data.table));
            }
            catch (err) {
                console.log(err);
                status = this.ERROR;
            }
            return status;
        });
    }
}
exports.MySqlDAO = MySqlDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWxEQU8uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYW8vbXlzcWxEQU8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFLL0IsK0RBQTREO0FBRTVELE1BQWEsUUFBUTtJQVFqQixZQUFZLElBQVM7UUFOSixPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsVUFBSyxHQUFHLENBQUMsQ0FBQztRQU12QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNWLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQzFCLElBQUcsR0FBRyxFQUFFO2dCQUNKLE1BQU0sR0FBRyxDQUFDO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRVksVUFBVTs7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBVTs7WUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQixJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMseUNBQW1CLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMzRjtZQUFDLE9BQU0sR0FBUSxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFDLEtBQVU7O1lBQzFCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDckIsSUFBSTtnQkFDQSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHlDQUFtQixDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDMUY7WUFBQyxPQUFNLEdBQVEsRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBQyxLQUFVLEVBQUUsSUFBUzs7WUFDckMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQixJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMseUNBQW1CLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDOUY7WUFBQyxPQUFNLEdBQVEsRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUdKO0FBN0RELDRCQTZEQyJ9