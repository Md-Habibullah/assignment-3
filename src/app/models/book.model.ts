import { Model, model, Schema } from "mongoose";
import { bookStaticMethod, IBook } from "../interfaces/book.interface";
import Borrow from "./borrow.model";

const bookSchema = new Schema<IBook, bookStaticMethod>({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
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

bookSchema.static('updateAvailability', async function (bookId: string) {
    const book = await this.findById(bookId)
    if (book) {
        book.available = book.copies > 0 ? true : false
        await book.save();
    }
});

bookSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Borrow.deleteMany({ book: doc._id })
        console.log(`Deleted all borrows for book ${doc.title}`)
    }
});

const Book = model<IBook, bookStaticMethod>('Book', bookSchema);

export default Book;