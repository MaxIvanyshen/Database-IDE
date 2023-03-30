import {Express, Request, Response} from 'express';

export interface Controller {
  index(req: Request, res: Response): void;
  config(app: Express): Express;
}