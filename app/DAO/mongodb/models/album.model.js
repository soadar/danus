import { Schema, model } from "mongoose";

const AlbumSchema = new Schema({
    title: { type: String, required: true, index: true },
    thumbnails: { type: String, required: false },
});

export const AlbumModel = model('albums', AlbumSchema);
