const controller = {};
const dire = {}

controller.servicio = (req,res) =>{
  res.render('modulos/servicios');

};
controller.clientes = (req,res) =>{
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM cliente', (err, callback) => {
    console.log(callback)
    if(err) {
        res.json(err);
    }
    res.render('modulos/clientes', {
        data: callback
      });
    });
  }); 
};

controller.ventas = (req,res) =>{
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM ventas', (err,callback) =>{
      //console.log(callback);
      if(err){
        res.json(err);
      }
      res.render('modulos/ventas',{
        data: callback
      });
    });
  });
};
//INICIO CRUD SERVICIOS
controller.createS = (req, res)=>{
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) =>{
      conn.query('INSERT INTO servicio set ?', [data], (err, rows) => {    
          res.redirect('/servicios');


      });
  })
};

controller.readS = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM servicio', (err, servicios) => {
        if(err) {
            res.json(err);
        }
        res.render('servicio', {
            data: servicios
        });
      });
    }); 
};

controller.editS = (req,res)=>{
  const {id} = req.params;
  console.log(id);
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id], (err, servicio) => {
      console.log(servicio);
      console.log(id);
      res.render('layouts/edit', {
          data: servicio[1]
      })
    });  
  })
};
controller.updateS = (req,res)=>{
  const {id} = req.params;
  const newService = req.body;
  console.log(newService);
  req.getConnection((err, conn) =>{
    conn.query('UPDATE servicio set nombre_servicio = ? WHERE id_service = ?', [newService,id], (err, rows) => {
      console.log(id,newService)
      res.render('servicio');
    });  
  })
};


controller.deleteS = (req, res)=>{
    const {id} = req.params;
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM servicio WHERE id_servicio = ?', [id], (err, rows) => {
            res.redirect('/servicios');
       });
    })
};
//FIN CRUD SERVICIOS

//INICIO CRUD VENTAS
controller.createV = (req, res)=>{
 
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) =>{
      conn.query('INSERT INTO ventas set ?', [data], (err, rows) => {    
          res.redirect('/ventas');
      });
  })
};


controller.readV = (req, res) => {
  req.getConnection((err, conn) => {
      conn.query('SELECT * FROM ventas', (err, servicios) => {
      if(err) {
          res.json(err);
      }
      res.render('servicio', {
          data: servicios
      });
    });
  }); 
};

controller.editV = (req,res)=>{
  const {id} = req.params;
  req.getConnection((err, conn) =>{
    conn.query('DELETE FROM ventas WHERE id = ?', [id], (err, rows) => {
      res.render('customer_edit '/*crear customer.ejs*/, {
          data: rows[0]
      })
    });  
  })
};

controller.updateV = (req,res)=>{
  const {id} = req.params;
  const newService = req.body;
  req.getConnection((err, conn) =>{
    conn.query('UPDATE ventas set ? WHERE id = ?', [newService,id], (err, rows) => {
      res.render('/ventas');
    });  
  })
};

controller.deleteV = (req, res)=>{
  const {id} = req.params;
  req.getConnection((err, conn) => {
      conn.query('DELETE FROM ventas WHERE id = ?', [id], (err, rows) => {
          res.redirect('/ventas');
     });
  })
};
//FIN CRUD VENYAS

//INICIO CRUD CLIENTES
controller.createC = (req, res)=>{
  const data = req.body;
  console.log(data);
  req.getConnection((err, conn) =>{
      conn.query('INSERT INTO cliente set ?', [data], (err, rows) => {    
          res.redirect('/clientes');
      });
  })
};

controller.editC = (req,res)=>{
  const {id} = req.params;
  req.getConnection((err, conn) =>{
    conn.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows) => {
      res.render('customer_edit '/*crear customer.ejs*/, {
          data: rows[0]
      })
    });  
  })
};

controller.updateC = (req,res)=>{
  const {id} = req.params;
  const newService = req.body;
  req.getConnection((err, conn) =>{
    conn.query('UPDATE cliente set ? WHERE id = ?', [newService,id], (err, rows) => {
      res.redirect('/');
    });  
  })
};


controller.deleteC = (req, res)=>{
  const {id} = req.params;
  req.getConnection((err, conn) => {
      console.log(err);
      conn.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows) => {
          res.redirect('http://localhost:3000/clientes');
          console.log(err);
     });
  })
};
//FIM CRUD CLIENTES

module.exports = controller;