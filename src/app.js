const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const expressmyConnection = require('express-myconnection');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();

const controller = require('./Routes/routes')

//settings
app.use(express.json());
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
},'single'));
app.use(express.urlencoded({extended: false}));


//render 
app.get('/', (req,res) => {
    res.render('login');
});

app.post('/home', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == 'usuario' && password == '1234') {
        console.log('Login successful');
        req.getConnection((err, conn) => {
            conn.query('SELECT id_servicio, COUNT(*) as cantidad FROM ventas GROUP BY id_servicio', (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al obtener los datos.');
                } else {
                    const labels = results.map(item => item.id_servicio);
                    const values = results.map(item => item.cantidad);
                    
                    res.render('home', {
                        labels: JSON.stringify(labels),
                        values: JSON.stringify(values)
                    });
                }
            });
        }); 
    } else {
        console.log('Login Fail');
    }
});

/*app.post('/home', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == 'usuario' && password == '1234'){
        console.log('Login succes');
        res.render('home');
    }else {
        console.log('Login Fail');
    }
});*/

app.use('/', controller);

//startin server 
app.listen(3000, () => {
    console.log('Server on port 3000 ...');
});