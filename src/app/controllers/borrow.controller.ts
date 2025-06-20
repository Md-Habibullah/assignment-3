import express, { Request, Response } from 'express'
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const book = await Book.findById(bookId);

        if (!book || book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available'
            })
            return
        }

        book.copies -= quantity;
        await book.save();

        await Book.updateAvailability(bookId)

        const borrow = await Borrow.create({
            book: bookId,
            quantity,
            dueDate
        })

        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'somthing went wrong',
            error
        });
    }
});

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: { _id: '$book', totalBookCount: { $sum: '$quantity' } }
            },

            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },

            {
                $unwind: '$bookInfo'
            },

            {
                $project: {
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    }
                }
            }
        ])
        console.log(summary)

        res.status(200).json({
            success: true,
            message: 'borrowed books summary retreved successfully',
            data: summary
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'somthing went wrong',
            error
        });
    }
})