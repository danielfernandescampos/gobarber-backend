import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
//import cors from "cors";
import 'express-async-errors';
import routes from './routes';
import '../typeorm';
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm'
import { RepositoryNotFoundError } from 'typeorm';
const cors = require('cors');
import '@shared/container';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => { //midleware de error handling
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})

app.listen(3333, () => console.log('servidor iniciou na porta 3333...'));
