import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { _id: string };
}

// Define authMiddleware as a RequestHandler so TS knows it's valid middleware
export const authMiddleware: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return; // ensure the function returns void
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, secret) as { _id: string };
    req.user = { _id: decoded._id };
    next(); // proceed to next middleware/handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
