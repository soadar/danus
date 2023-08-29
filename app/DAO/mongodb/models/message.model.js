import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    name: { type: String, required: true, index: true },
    tel: { type: String, required: false },
    message: { type: String, required: true },
}, { timestamps: true });

export const MessageModel = model('messages', MessageSchema);
