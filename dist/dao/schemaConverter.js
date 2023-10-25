"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaConverter = void 0;
class SchemaConverter {
    static convert(schema) {
        let result = {};
        this.convertDataTypes(schema);
        for (let i = 0; i < schema.length; i++) {
            result[schema[i].column_name] = {
                type: schema[i].data_type,
                required: true
            };
        }
        return result;
    }
    static convertDataTypes(schema) {
        for (let i = 0; i < schema.length; i++) {
            if (schema[i].data_type == 'integer') {
                schema[i].data_type = "Number";
            }
            else if (schema[i].data_type == 'character varying' || schema[i].data_type == 'text' || schema[i].data_type == 'varchar') {
                schema[i].data_type = "String";
            }
        }
        ;
    }
}
exports.SchemaConverter = SchemaConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hQ29udmVydGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZGFvL3NjaGVtYUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGVBQWU7SUFHakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFXO1FBQzdCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRztnQkFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUN6QixRQUFRLEVBQUUsSUFBSTthQUNqQixDQUFBO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQVc7UUFDdkMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRTtnQkFDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7YUFDbEM7aUJBQ0ksSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLG1CQUFtQixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO2dCQUNySCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzthQUNsQztTQUNKO1FBQ0QsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQTFCRCwwQ0EwQkMifQ==