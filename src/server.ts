import express, { Application, Request, Response } from 'express';
import connectDB from '../config/db';
import { authRouter } from './routes/auth';

const app: Application = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (_req: Request, res: Response) =>
  res.json({ msg: 'Welcome to the ContactKeeper API...' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', authRouter);
// app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
