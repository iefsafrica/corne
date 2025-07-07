const {app} = require('./server');
const getConnection = require('../config/db/connection');

const startServer = async() => {
    try{
        const message =  await getConnection();
        server.listen(port || 3000, () => {});

        app.on('error', (err) => {
            process.exit(1);
        });

    } catch(error) {
        process.exit(1);
    }
}

startServer();
