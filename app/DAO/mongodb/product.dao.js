import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

    async getAll() {
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(_id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(_id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateMany(filter, update) {
        try {
            const response = await ProductModel.updateMany(filter, update, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchAlbum(album) {
        try {
            const response = await ProductModel.find({ album });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchProd(title) {
        try {
            const response = await ProductModel.find({ title });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchRegex(regex) {
        const regexNuevo = new RegExp(regex);
        try {
            const response = await ProductModel.find({ album: regexNuevo });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}