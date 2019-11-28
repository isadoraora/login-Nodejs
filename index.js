const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const routes = require('./src/routes')

const port = 8000;

//String de conexão com o mongo
mongoose.connect("mongodb+srv://admin:admin123@cluster0-7x4ot.mongodb.net/sky", {useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error: '))
db.once('open', function{
    console.log('Conexão feita com sucesso!')
})

//middleware
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
    )
    next()
})

app.use(BodyParser());
app.use('/',routes);
app.use(helmet());
app.listen(port, ()=>console.log('Server running.'))
