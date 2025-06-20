import { Model, model, Schema } from "mongoose";
import { bookStaticMethod, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, bookStaticMethod>({
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

bookSchema.static('updateAvailability', async function (bookId: string) {
    const book = await this.findById(bookId)
    if (book) {
        book.available = book.copies > 0 ? true : false
        await book.save();
    }
});

const Book = model<IBook, bookStaticMethod>('Book', bookSchema);

export default Book;