import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from './helpers/env';
import articleRouter from './routes/article-route';
import userRouter from './routes/user-route';
import mapRouter from './routes/map-route';
import tagRouter from './routes/tag-route';
import errorRouter from './routes/error-route';
import { roleQueueRouter } from './routes/role-queue-route';

const app = express();
const PORT = env('PORT', '5000');
const ATLAS_URI = env('ATLAS_URI');
const NEXT_URL = env('NEXT_URL');

app.use(express.json());

mongoose.connect(ATLAS_URI);
const { connection } = mongoose;

connection.once('open', () => {
  console.info('MongoDB connected.');
});

app.use(cors({ origin: [NEXT_URL], optionsSuccessStatus: 200 }));
app.use('/users', userRouter);

app.use('/articles', articleRouter);

app.use('/maps', mapRouter);

app.use('/tags', tagRouter);

app.use('/role-queue', roleQueueRouter);

app.use(errorRouter);

app.listen(PORT, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
