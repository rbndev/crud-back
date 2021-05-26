const mysql = require('mysql')

const databaseConfig = {
    host: 'mysql743.umbler.com',
    user: 'rbnclub',
    password: 'senhadb_',
    database: 'rbnclub'
}

const connection = mysql.createConnection(databaseConfig)

connection.connect(function(err) {
  if (err) {
    console.error(err) // err.stack
    return
  }
  
  // console.log('DB conectado com sucesso!') // + connection.threadId
})

module.exports = connection