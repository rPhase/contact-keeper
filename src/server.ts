import express, { Application, Request, Response } from 'express';
import connectDB from '../config/db';
import { authRouter } from './routes/auth';
import { contactsRouter } from './routes/contacts';
import { usersRouter } from './routes/users';

const app: Application = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (_req: Request, res: Response) =>
  res.json({ msg: 'Welcome to the ContactKeeper API...' })
);

// Define Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
