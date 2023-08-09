
CREATE DATABASE IF NOT EXISTS Empresa_telefonica;

-- Usar la base de datos creada
USE Empresa_telefonica;

-- Crear la tabla "cliente"
CREATE TABLE IF NOT EXISTS cliente (
    dpi INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    direccion VARCHAR(200)
);

-- Crear la tabla "servicio"
CREATE TABLE IF NOT EXISTS servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100)
);

-- Crear la tabla "ventas"
CREATE TABLE ventas (
    num INT AUTO_INCREMENT PRIMARY KEY,
    dpi INT,
    id_servicio INT,
    precio DECIMAL(10, 2),
    fecha DATE,
    FOREIGN KEY (dpi) REFERENCES cliente(dpi),
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio)
);

select * from servicio;
select * from cliente;
select * from ventas;

DROP DATABASE Empresa_telefonica;