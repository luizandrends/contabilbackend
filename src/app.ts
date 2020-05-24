import 'reflect-metadata';
import './database';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.mongo();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  private routes(): void {
    this.express.use(routes);
  }

  private mongo(): void {
    mongoose.connect('mongodb://localhost:27017/mongocontabil', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().express;
