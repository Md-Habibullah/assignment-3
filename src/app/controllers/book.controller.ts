import express, { Request, Response } from 'express'
import Book from '../models/book.model';


export const bookRoutes = express.Router();

bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body)
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
})

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const {
            filter,
            sortBy = 'createdAt',
            sort = 'asc',
            page = '1',
            limit = '10',
        } = req.query;

        const sortField = typeof sortBy === 'string' ? sortBy : 'createdAt';
        const sortOrder = sort === 'desc' ? -1 : 1;
        const pageNumber = parseInt(page.toString()) || 1;
        const limitNumber = parseInt(limit.toString()) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // Build query
        const query: any = {};
        if (filter) {
            query.genre = filter.toString().toUpperCase();
        }

        // Total count for pagination
        const totalBooks = await Book.countDocuments(query);

        // Fetch paginated + sorted books
        const books = await Book.find(query)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
            meta: {
                total: totalBooks,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(totalBooks / limitNumber),
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error,
        });
    }
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId
        const book = await Book.findById(id)

        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
});

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId
        const body = req.body
        const books = await Book.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: books
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
})

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        const books = await Book.findOneAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
})