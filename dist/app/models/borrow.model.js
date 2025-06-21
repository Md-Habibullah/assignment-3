"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'You must borrow at least one copy']
    },
    dueDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});
borrowSchema.pre('save', function (next) {
    console.log(`Borrowing ${this.quantity} books for Book ID: ${this.book}`);
    next();
});
borrowSchema.post('save', function (data, next) {
    console.log(`Borrow record saved for book ID: ${data.book}`);
    next();
});
const Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
exports.default = Borrow;
