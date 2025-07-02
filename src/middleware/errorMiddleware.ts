import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HTTPException';

// General error handling middleware
export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`Error: ${message}`); // Log the error

  res.status(status).json({
    status,
    message
  });
};
