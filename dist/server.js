"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoController_1 = require("./db_controllers/mongoController");
const postgresController_1 = require("./db_controllers/postgresController");
const mysqlController_1 = require("./db_controllers/mysqlController");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.PORT = 8000;
        this.app = (0, express_1.default)();
        this.mongoController = new mongoController_1.MongoController();
        this.postgresController = new postgresController_1.PostgresController();
        this.mysqlContoller = new mysqlController_1.MySqlController();
        this.config();
    }
    config() {
        this.app.use(express_1.default.json());
        this.mongoController.config(this.app);
        this.app.use((0, cors_1.default)({ origin: ["http://localhost:5173", 'http://127.0.0.1:5173'] }));
        this.postgresController.config(this.app);
        this.mysqlContoller.config(this.app);
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log(`listening on port ${this.PORT}`);
        });
    }
}
exports.Server = Server;
const server = new Server();
server.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUE0RDtBQUU1RCxzRUFBbUU7QUFDbkUsNEVBQXlFO0FBQ3pFLHNFQUFtRTtBQUNuRSxnREFBd0I7QUFFeEIsTUFBYSxNQUFNO0lBUWY7UUFOUSxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBT2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksRUFBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLHVCQUF1QixFQUFHLHVCQUF1QixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE3QkQsd0JBNkJDO0FBRUQsTUFBTSxNQUFNLEdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUNwQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMifQ==