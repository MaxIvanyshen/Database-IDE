import {Express, Request, Response} from 'express';

export class MongoController {
    public index(req: Request, res: Response): void {
        res.send("welcome to mongodb IDE!");
    }

    public config(app: Express): Express {
        app.get("/mongo/", (req: Request, res: Response) => {
            this.index(req, res);
        });

        return app;
    }
}