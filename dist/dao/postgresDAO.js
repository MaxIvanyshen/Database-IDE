"use strict";
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
exports.PostgresDAO = void 0;
const pg_1 = require("pg");
const sqlQueryConstructor_1 = require("./sqlQueryConstructor");
const schemaConverter_1 = require("./schemaConverter");
class PostgresDAO {
    constructor(data) {
        this.OK = 0;
        this.ERROR = 1;
        this.data = null;
        this.client = null;
        this.schema = null;
        if (data != undefined)
            this.data = data;
        this.connectToDB();
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = new pg_1.Client(this.data.connection_data);
            let status = 0;
            this.client.connect((err) => {
                if (err) {
                    throw err;
                    status = this.ERROR;
                }
                ;
            });
            return status;
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema == null)
                yield this.getSchema();
            let status = this.OK;
            yield this.client.query(sqlQueryConstructor_1.SqlQueryConstructor.makeInsertionQueryStr(data, this.data.table)).catch((err) => { status = this.ERROR; console.log(err); });
            return status;
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema == null)
                yield this.getSchema();
            const result = yield this.client.query(sqlQueryConstructor_1.SqlQueryConstructor.makeSelectionQueryStr(query, this.data.table));
            return result.rows[0];
        });
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema == null)
                yield this.getSchema();
            let queryStr = sqlQueryConstructor_1.SqlQueryConstructor.makeSelectionQueryStr(query, this.data.table);
            const result = yield this.client.query(queryStr);
            return result.rows;
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema == null)
                yield this.getSchema();
            let status = this.OK;
            yield this.client.query(sqlQueryConstructor_1.SqlQueryConstructor.makeDeletionQueryStr(query, this.data.table)).catch((err) => { status = this.ERROR; console.log(err); });
            return status;
        });
    }
    update(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.schema == null)
                yield this.getSchema();
            let status = this.OK;
            yield this.client.query(sqlQueryConstructor_1.SqlQueryConstructor.makeUpdateQueryStr(query, data, this.data.table)).catch((err) => { status = this.ERROR; console.log(err); });
            return status;
        });
    }
    getSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '${this.data.table}'
    `);
            this.schema = result.rows;
            return schemaConverter_1.SchemaConverter.convert(this.schema);
        });
    }
}
exports.PostgresDAO = PostgresDAO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGdyZXNEQU8uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYW8vcG9zdGdyZXNEQU8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMkJBQTRCO0FBQzVCLCtEQUE0RDtBQUM1RCx1REFBb0Q7QUFFcEQsTUFBYSxXQUFXO0lBU3RCLFlBQVksSUFBYTtRQVJULE9BQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLFNBQUksR0FBUSxJQUFJLENBQUM7UUFDakIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUVuQixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBR3pCLElBQUcsSUFBSSxJQUFJLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVZLFdBQVc7O1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRCxJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsTUFBTSxHQUFHLENBQUM7b0JBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3JCO2dCQUFBLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVZLEtBQUssQ0FBQyxJQUFZOztZQUM3QixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSTtnQkFDcEIsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFN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