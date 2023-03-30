"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoController = void 0;
class MongoController {
    index(req, res) {
        res.send("welcome to mongodb IDE!!!");
    }
    config(app) {
        app.get("/mongo/", (req, res) => {
            this.index(req, res);
        });
        return app;
    }
}
exports.MongoController = MongoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9uZ29Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsZUFBZTtJQUNqQixLQUFLLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBWTtRQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBWkQsMENBWUMifQ==