import {MongoDAO} from "../src/mongoDAO";
import { ObjectId } from "mongodb";

export class MongoDAO_TEST {

    runTests(): void {

        test('test connecting to MongoDB', () => {
            expect((MongoDAO.connectToDB())).toBe(MongoDAO.OK);
        });
        
    
        test('test writing random data', () => {
            const data = {
                "name": "Max",
                "surname": "Ivanyshen",
                "age": 14,
            };
            expect(MongoDAO.write(data)).toBe(MongoDAO.OK);
        });
        
        test('test getting data', () => {
            const query = {"name": "Max"};
        })
    }
}