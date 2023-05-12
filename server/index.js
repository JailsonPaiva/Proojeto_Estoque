const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// CONEXÃO BANCO DE DADOS
const db = mysql.createPool({
    host:"concipe.com.br",
    user:"concipecom_fasiclin",
    password:"db_aluno2023",
    database: "concipecom_fasiclin"

});

// SERVER CONFIG
app.use(cors());
app.use(express.json());

//ROTAS 
app.post("/consultar", (req, res) =>{
    const { cnpj } =  req.body;

    let SQL = `select * from estoque, ordem where estoque.cnpj = ${cnpj}  and ordem.cnpj = ${cnpj}`;

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    });

});

// app.get("/consultarOrdem", (req, res) => {
    
// })

app.get('/confirmar', (req, res) => {
    const SQL = "SELECT * FROM estoque";

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err)
        } else res.send(result)
    })
})

app.get('/ordem', (req, res) => {
    const SQL = "SELECT * FROM ordem";

    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err)
        } else res.send(result)
    })
})


//PORTAS
app.listen(8080, () => {
    console.log("Server Rodando!")
});