import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true, index: true },
    thumbnails: { type: String, required: false },
    album: { type: String, required: true, index: true },
});

export const ProductModel = model('products', ProductSchema);
