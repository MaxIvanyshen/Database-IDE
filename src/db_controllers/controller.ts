import {Express, Request, Response} from 'express';

export interface DbController {
  config(app: Express): Express;
}