require('dotenv').config()

module.export = {
    mongo_url: process.env.MONGO_URL,
    PORT: process.env.PORT
}