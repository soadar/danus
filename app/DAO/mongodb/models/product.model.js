import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true, index: true },
    thumbnails: { type: String, required: false },
});

export const ProductModel = model('products', ProductSchema);
