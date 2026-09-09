import app from '../index.js';
import { db } from '../db.js';

await db.ready;

export default app;
