import 'dotenv/config';
import express, { Request, Response, NextFunction } from "express"
import AppError from './middlewares/errors/AppError';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes'

const port = process.env.PORT || 4001
const app = express()

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(port, () => {
    console.log(`Server started on port ${port}! 🏆`);
})
