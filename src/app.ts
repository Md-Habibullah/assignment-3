import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from 'cors'

const app: Application = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://l2b5-assignment-4.vercel.app'
    ]
}))
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// app.use("/notes", notesRoutes);
// app.use("/users", userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("server is running");
});

export default app;