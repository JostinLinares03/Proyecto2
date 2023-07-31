const express = require('express');
const path = require('path');
const mysql = require('mysql');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const expressmyConnection = require('express-myconnection')
const app = express();
const hbs = require('hbs');
const morgan = require('morgan');

//importing routes
const customerRoutes = require('./routes/customer')

const { insert , read, update, remove} = require('./operations');

//settings 
app.use(express.json());
//app.set('view engine', 'ejs');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',engine({
    extname: '.hbs'
}));



//middlewares
app.use(morgan('dev'));
app.use(expressmyConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: 3306,
    database: 'Empresa_telefonica'
}, 'single'));
app.use(express.urlencoded({extended: false}));



//routes
app.use('/', customerRoutes);

//stactic files 
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/',(req , res) => {
    res.render(path.resolve(__dirname, 'index.ejs'))
});*/


app.get('/#Clientes',(req , res) => {
    insert(connection, {nombre_servicio: 'Telefonía Residencial'},(result) => {
        res.json(result);
    });
});
app.get('/read',(req , res) => {
    read(connection, (result) => {
        res.json(result);
    });
});

app.get('/update',(req , res) => {
    update(connection, { nombre_servicio: 'Telefonía movil', id: 3},(result) => {
        res.json(result);
    });
});

app.get('/remove',(req , res) => {
    remove(connection, {id: 3},(result) => {
        res.json(result);
    });
});

//starting server
app.listen(3000, () => {
    console.log('Server on port 3000 ...');
});