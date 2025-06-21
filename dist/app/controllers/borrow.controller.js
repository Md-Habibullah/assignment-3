"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available'
            });
            return;
        }
        book.copies -= quantity;
        yield book.save();
        yield book_model_1.default.updateAvailability(bookId);
        const borrow = yield borrow_model_1.default.create({
            book: bookId,
            quantity,
            dueDate
        });
        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'somthing went wrong',
            error
        });
    }
}));
exports.borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
        ]);
        console.log(summary);
        res.status(200).json({
            success: true,
            message: 'borrowed books summary retreved successfully',
            data: summary
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'somthing went wrong',
            error
        });
    }
}));
