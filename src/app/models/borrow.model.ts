import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
    if (this.dueDate < new Date()) {
        return next(new Error('dueDate cannot be in the past'))
    }
    next()
})

const Borrow = model<IBorrow>('Borrow', borrowSchema);

export default Borrow;