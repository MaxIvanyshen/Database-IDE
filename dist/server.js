"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoController_1 = require("./mongoController");
class Server {
    constructor() {
        this.PORT = 8000;
        this.app = (0, express_1.default)();
        this.mongoController = new mongoController_1.MongoController();
        this.config();
    }
    config() {
        this.mongoController.config(this.app);
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log("listening on port " + this.PORT);
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUE0RDtBQUU1RCx1REFBb0Q7QUFFcEQsTUFBYSxNQUFNO0lBTWY7UUFKUSxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBS2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUMsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXRCRCx3QkFzQkM7QUFFRCxNQUFNLE1BQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyJ9