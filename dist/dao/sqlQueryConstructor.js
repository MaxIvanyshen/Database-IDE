"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlQueryConstructor = void 0;
class SqlQueryConstructor {
    static makeSelectionQueryStr(query, table) {
        let queryStr = `SELECT * FROM ${table} WHERE `;
        const keys = Object.keys(query);
        if (keys.length != 0) {
            for (let i = 0; i < keys.length; i++) {
                queryStr += `${keys[i]} = '${query[keys[i]]}'`;
                if (i < keys.length - 1)
                    queryStr += ' AND ';
                else
                    queryStr += ';';
            }
            return queryStr;
        }
        return `SELECT * FROM ${table};`;
    }
    static makeInsertionQueryStr(query, table) {
        let queryStr = `INSERT INTO ${table}(`;
        const keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            queryStr += keys[i];
            if (i < keys.length - 1)
                queryStr += ', ';
            else
                queryStr += ') VALUES (';
        }
        for (let i = 0; i < keys.length; i++) {
            queryStr += `'${query[keys[i]]}'`;
            if (i < keys.length - 1)
                queryStr += ', ';
            else
                queryStr += ');';
        }
        return queryStr;
    }
    static makeUpdateQueryStr(query, data, table) {
        let queryStr = `UPDATE ${table} SET `;
        const dataKeys = Object.keys(data);
        for (let i = 0; i < dataKeys.length; i++) {
            queryStr += `${dataKeys[i]} = '${data[dataKeys[i]]}'`;
            if (i < dataKeys.length - 1)
                queryStr += ', ';
            else
                queryStr += ' WHERE ';
        }
        const queryKeys = Object.keys(query);
        for (let i = 0; i < queryKeys.length; i++) {
            queryStr += `${queryKeys[i]} = '${query[queryKeys[i]]}'`;
            if (i < queryKeys.length - 1)
                queryStr += ' AND ';
            else
                queryStr += ';';
        }
        return queryStr;
    }
    static makeDeletionQueryStr(query, table) {
        let queryStr = `DELETE FROM ${table} WHERE `;
        const keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            queryStr += `${keys[i]} = '${query[keys[i]]}'`;
            if (i < keys.length - 1)
                queryStr += ' AND ';
            else
                queryStr += ';';
        }
        return queryStr;
    }
}
exports.SqlQueryConstructor = SqlQueryConstructor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsUXVlcnlDb25zdHJ1Y3Rvci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImRhby9zcWxRdWVyeUNvbnN0cnVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLE1BQWEsbUJBQW1CO0lBQ3JCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFVLEVBQUUsS0FBYTtRQUN6RCxJQUFJLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxTQUFTLENBQUM7UUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQy9DLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDbEIsUUFBUSxJQUFJLE9BQU8sQ0FBQzs7b0JBRXBCLFFBQVEsSUFBSSxHQUFHLENBQUM7YUFDdkI7WUFDRCxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNELE9BQU8saUJBQWlCLEtBQUssR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBVSxFQUFFLEtBQWE7UUFDekQsSUFBSSxRQUFRLEdBQUcsZUFBZSxLQUFLLEdBQUcsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxF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