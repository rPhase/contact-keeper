import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

interface JwtPayload {
  user: Record<string, any>;
}
export default function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
