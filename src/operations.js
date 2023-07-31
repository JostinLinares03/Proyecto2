const mysql = require('mysql');

function insert(connection, data, callback){
    let insertQuery = 'insert into servicio (nombre_servicio) value (?)';
    let query = mysql.format(insertQuery, [data.nombre_servicio]);
    connection.query(query, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

function read(connection, callback){
    connection.query('SELECT * FROM servicio', function(err, result){
        if(err) throw err;
        callback(result);
    });
}

function update(connection, data, callback){
    let updateQuery = 'UPDATE servicio SET nombre_servicio = ? WHERE id_servicio = ? ';
    let query = mysql.format(updateQuery, [data.nombre_servicio, data.id]);
    
    connection.query(query, function (err, result){
        if(err) throw err;
        callback(result);
    });
}

function remove(connection, data, callback){
    let removeQuery = 'DELETE FROM servicio WHERE id_servicio = ? ';
    let query = mysql.format(removeQuery, [data.id]);
    
    connection.query(query, function (err, result){
        if(err) throw err;
        callback(result);
    });
}
module.exports = {insert, read, update, remove};