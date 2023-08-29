import { connect } from 'mongoose';
import config from '../../config.js';

try {
    await connect(config.MONGO_ATLAS_URL)
    console.log('Conectado a MongoDB!');
} catch (error) {
    console.log(error);
}
