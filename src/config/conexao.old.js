const conexao = () => {
    const mysql = require('mysql'),
        connConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'rbnclub'
        },
        con = mysql.createConnection(connConfig),
        connect = function (err) {
        if (err) throw err
            console.log("DB conectado com sucesso!")
        },
        connectionError = function (err) {
            con = mysql.createConnection(connConfig)
            con.connect(connect)
            con.on('error', connectionError)
    }
    con.connect(connect)
    con.on('error', connectionError)

    // con.query("SELECT * FROM users WHERE nick = ?", ['rbn'], function (erro, resultado){
    //     console.log(resultado[0])
    // });
}

module.exports = conexao