const express = require('express'),
  cors = require('cors'),
  mysql = require('mysql'),
  JWT = require('jsonwebtoken'),
  bodyParser = require('body-parser');

const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 4000
const jsonParser = bodyParser.json()

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "project3lm"
})

http.listen(port, () => {
  console.log("Servidor 3LM on na porta 4000.")
})

// Routes
app.use(cors())
app.use(express.static('public'));
app.use('/', express.static(__dirname + '/build'));

app.post('/cadastro', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const nome = req.body.nome,
    sobrenome = req.body.sobrenome,
    salario = req.body.salario,
    datanascimento = req.body.datanascimento,
    cargo = req.body.cargo

    if( nome && sobrenome && salario && datanascimento && cargo ){
      let sql = `SELECT * FROM users WHERE nome = ? AND sobrenome = ?`
      let stmt = [nome, sobrenome];
      con.query(sql, stmt, function (error, results, fields) {
        const findUser = results.length > 0
        if (error) throw error
    
        if (!findUser) {
          const sql = `INSERT INTO users (nome, sobrenome, salario, data_nascimento, cargo)
                      VALUES ('${nome}', '${sobrenome}', '${salario}', '${datanascimento}', '${cargo}')`
          con.query(sql)
          con.end
          res.send(results)
        } else console.log('user já cadastrado.')
      })
    }else{
      console.log("algum dado faltando")
    }
})

app.post('/delete', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const id = req.body.id

    if( id ){
      let sql = `SELECT * FROM users WHERE id = ?`
      let stmt = [id];
      con.query(sql, stmt, function (error, results, fields) {
        const findUser = results.length > 0
        if (error) throw error
    
        if (findUser) {
          const sql = `DELETE FROM users WHERE id = '${id}'`
          con.query(sql)
          con.end
          res.send(results)
        } else console.log('não existe.')
      })
    }else{
      console.log("algum dado faltando")
    }
})

app.post('/edit', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const id = req.body.id,
    nome = req.body.nome,
    sobrenome = req.body.sobrenome,
    salario = req.body.salario,
    datanascimento = req.body.data_nascimento,
    cargo = req.body.cargo

    if( id ){
      let sql = `SELECT * FROM users WHERE id = ?`
      let stmt = [id];
      con.query(sql, stmt, function (error, results, fields) {
        const findUser = results.length > 0
        if (error) throw error
    
        if (findUser) {
          con.query("UPDATE users SET nome = ?, sobrenome = ?, salario = ?, data_nascimento = ?, cargo = ?  WHERE id = ?", 
          [nome, sobrenome, salario, datanascimento, cargo, id], function (erro, resultado){           
          });
          res.send(results)
        } else console.log('não existe.')
      })
    }else{
      console.log("algum dado faltando")
    }
})


app.get('/listcargos', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  con.query('SELECT * FROM cargos ', function (error, results, fields) {
    res.send(results)
  })
  return 'erro'

})

app.get('/listusers', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  con.query('SELECT * FROM users ', function (error, results, fields) {
    res.send(results)
  })
  return 'erro'

})

app.post('/addcargo', jsonParser, function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const cargo = req.body.cargo

  if(cargo){
    con.query('SELECT * FROM cargos WHERE cargo = ?', [cargo], function (error, results, fields) {
      const findUser = results.length > 0
      if (error) throw error
  
      if (!findUser) {
        let stmt = `INSERT INTO cargos(cargo)
              VALUES(?)`;
        let todo = [cargo, false];
        con.query(stmt, todo, (err, results, fields) => {
          if (err) {
            return console.error(err.message);
          }
          // get inserted id
          res.send(cargo)
          console.log('Todo Id:' + results.insertId);
        });
      } else console.log('cargo já cadastro!')
    })
  }
})