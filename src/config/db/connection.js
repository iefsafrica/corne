const mongoose = require('mongoose');
const {mongo_url} = require('../env/variables');

const mongoOptions = {
    connectTimeoutMs: 20000,
    serverSelectionTimeoutMs: 60000,
    maxPoolSize: 10,
    minPoolSize: 2,
    retrywrites: true,
    retryReads: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let  mainConnection;

const getConnection = async () => {
    try{
        if(!mongo_url) {
            throw new Error('url is not available')
        }

        if(!mainConnection || mainConnection.readyState !==1) {
            await mongoose.connect(mongo_url, mongoOptions);

            mainConnection = mongoose.connection;

            mainConnection.on('error', err=> {
                throw err
            });

            mainConnection.on('disconnected', () => {
                setTimeout(getConnection, 5000);
            });

            mainConnection.on('connected', () => {
                console.log('succesfully connected to mongo db')
            })
        }

        return 'Database connection established';
    } catch (error) {
        throw error;
    }
}

module.exports = { getConnection };