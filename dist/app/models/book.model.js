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
const mongoose_1 = require("mongoose");
const borrow_model_1 = __importDefault(require("./borrow.model"));
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: 'genre is not valid, got {VALUE}'
        },
        uppercase: true
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'isbn must to be unique']
    },
    description: { type: String },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies must be a non-negative number']
    },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.static('updateAvailability', function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (book) {
            book.available = book.copies > 0 ? true : false;
            yield book.save();
        }
    });
});
bookSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.default.deleteMany({ book: doc._id });
            console.log(`Deleted all borrows for book ${doc.title}`);
        }
    });
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
