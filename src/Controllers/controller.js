const controller = {};

//CLientes
controller.clientes = (req,res) =>{
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM cliente', (err, callback) => {
      if(err) {
          res.json(err);
      }
      res.render('Clientes', {
          data: callback
        });
      });
    }); 
  };
controller.addClie = (req, res)=>{
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO cliente set ?', [data], (err, rows) => {    
            res.redirect('/src/Views/Clientes.hbs');
        });
    })
};

controller.deleteClie = (req, res)=>{
  const {id} = req.params;
  req.getConnection((err, conn) => {
      conn.query('DELETE FROM cliente WHERE dpi = ?', [id], (err, rows) => {
          res.redirect('/src/Views/Clientes.hbs'); 
     });
  })
};

controller.editC = (req,res)=>{
  const {id} = req.params;
  console.log(id);
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM cliente WHERE dpi = ?', [id], (err, cliente) => {
      const dpi = cliente[0].dpi
      const nombre = cliente[0].nombre;
      const email = cliente[0].email;
      const direccion = cliente[0].direccion;
    res.render('EditClie', {
        dpi: dpi,
        nombre: nombre,
        email: email,
        direccion: direccion
      })
    });  
  })
};

controller.updateC = (req,res)=>{
  const id = req.body.dpi;
  const newService = req.body;
  req.getConnection((err, conn) =>{
    conn.query('UPDATE cliente set ? WHERE dpi = ?', [newService,id], (err, rows) => {
      res.redirect('/src/Views/Clientes.hbs');
       
    });  
  })
};

//Ventas
controller.ventas = (req,res) =>{
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM ventas', (err,callback) =>{
        if(err){
          res.json(err);
        }
        res.render('Ventas',{
          data: callback
        });
      });
    });
  };

  controller.editV = (req,res)=>{
    const {id} = req.params;
    req.getConnection((err, conn) =>{
      conn.query('SELECT * FROM ventas WHERE num = ?', [id], (err, ventas) => {
          const num = ventas[0].num;
        res.render('EditVen', {
          num: num,
          data: ventas[0]
        })
      });  
    })
  };
  
  controller.updateV = (req,res)=>{
    const id = req.body.num;
    const updatedData = {
      dpi: req.body.dpi,
      id_servicio: req.body.id_servicio,
      precio: req.body.precio,
      fecha: req.body.fecha
    };
    console.log(id);
    console.log(updatedData);
    req.getConnection((err, conn) =>{
      conn.query('UPDATE ventas set ? WHERE num = ?', [updatedData,id], (err, rows) => {
        res.redirect('/src/Views/Ventas.hbs');
      });  
    })
  };


  controller.addVen = (req, res)=>{
    const dpi = req.body.dpi;
    const id_servicio = req.body.id_servicio;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    console.log(dpi, id_servicio, precio , fecha);
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO  ventas set dpi = ?, id_servicio = ?, precio = ?, fecha = ?', [dpi, id_servicio, precio, fecha], (err, rows) => {    
            res.redirect('/src/Views/Ventas.hbs');
        });
    })
  };
  controller.deleteVen = (req, res)=>{
    const {id} = req.params;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM ventas WHERE num = ?', [id], (err, rows) => {
            res.redirect('/src/Views/Ventas.hbs');
       });
    })
  };


//servicios 
controller.servicios = (req,res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM servicio', (err, servicios) => {
        if(err) {
            res.json(err);
        }
        res.render('Servicios', {
            data: servicios
        });
      });
    }); 
};

controller.addSer = (req,res)=> {
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) =>{
      conn.query('INSERT INTO servicio set ?', [data], (err, rows) => {    
          res.redirect('/src/Views/Servicios.hbs');
      });
  })
};

controller.deleteSer = (req, res)=>{
  const {id} = req.params;
  console.log(id);
  req.getConnection((err, conn) => {
      conn.query('DELETE FROM servicio WHERE id_servicio = ?', [id], (err, rows) => {
          res.redirect('/src/Views/Servicios.hbs');
     });
  })
};

controller.editS = (req,res)=>{
  const {id} = req.params;
  console.log(id);
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id], (err, servicio) => {
      const nombreServicio = servicio[0].nombre_servicio;
      const idServicio = servicio[0].id_servicio;
      console.log(nombreServicio);
      res.render('EditSer', {
          nombre_servicio: nombreServicio,
          id_servicio: idServicio
      })
    });     
  })
};

controller.updateS = (req,res)=>{
  const id = req.body.id_servicio;
  const data = req.body.nombre_servicio;
  console.log(id);
  console.log(data);
  req.getConnection((err, conn) =>{
    conn.query('UPDATE servicio set nombre_servicio = ? WHERE id_servicio = ?', [data,id], (err, rows) => {
      res.redirect('/src/Views/Servicios.hbs');
    });  
  })
};


//Inicio
controller.home = (req,res) =>{
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
};

module.exports = controller;