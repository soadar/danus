import { MessageModel } from "./models/message.model.js";

export default class MessageDaoMongoDB {

    async getAll() {
        try {
            const response = await MessageModel.find({});

            const formattedMessages = response.map((message) => ({
                ...message,
            }));

            formattedMessages.forEach((message) => {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
                message._doc.createdAt = message._doc.createdAt.toLocaleDateString('es-ES', options);
            })
            //timestamp: message.createdAt.toLocaleDateString('es-ES', options)
            console.log(formattedMessages);
            return formattedMessages;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await MessageModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await MessageModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await MessageModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await MessageModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}