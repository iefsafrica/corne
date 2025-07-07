const express =  require('express')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

const routerConfig = require('..routes/index');

app.use(routerConfig());

module.exports = {app}