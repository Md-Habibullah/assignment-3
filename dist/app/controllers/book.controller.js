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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
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
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort = 'asc', limit = '10' } = req.query;
        // Validate sortBy
        const sortByString = typeof sortBy === 'string' ? sortBy : 'createdAt';
        // Build query
        const query = {};
        if (filter) {
            query.genre = filter.toString().toUpperCase();
        }
        console.log(query);
        // Build sort option
        const sortOption = {};
        sortOption[sortByString] = sort === 'desc' ? -1 : 1;
        // Fetch books
        const books = yield book_model_1.default.find(query)
            .sort(sortOption)
            .limit(parseInt(limit.toString()));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.default.findById(id);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const body = req.body;
        const books = yield book_model_1.default.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const books = yield book_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}));
