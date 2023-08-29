import { AlbumModel } from "./models/album.model.js";

export default class AlbumDaoMongoDB {

    async getAll() {
        try {
            const response = await AlbumModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await AlbumModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await AlbumModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await AlbumModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await AlbumModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}