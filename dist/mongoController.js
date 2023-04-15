"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoController = void 0;
const mongoDAO_1 = require("./mongoDAO");
class MongoController {
    constructor() {
        this.dao = new mongoDAO_1.MongoDAO();
    }
    addMongoData(req, res) {
        console.log("suka " + req.body);
        // fs.writeFileSync("./db_data/mongo_data.json", (JSON.stringify(mongo_data) as string));
        res.send(200);
    }
    config(app) {
        app.post("/mongo/add_data", (req, res) => {
            this.addMongoData(req, res);
        });
        return app;
    }
}
exports.MongoController = MongoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9uZ29Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUFzQztBQUl0QyxNQUFhLGVBQWU7SUFJeEI7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxZQUFZLENBQUMsR0FBMEIsRUFBRSxHQUFhO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyx5RkFBeUY7UUFDekYsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQVk7UUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBckJELDBDQXFCQyJ9