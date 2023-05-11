const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host:"concipe.com.br",
    user:"concipecom_fasiclin",
    password:"db_aluno2023",
    database: "concipecom_fasiclin"

});

app.use(cors());
app.use(express.json());


app.post("/confirmar", (req, res) =>{
    const { ordem } = req.body;
    const { fornecedor } =  req.body;
    const { cnpj } =  req.body;
    const { entrega } =  req.body;
    const { descri } =  req.body;
    const { qtd } =  req.body;
    const { valor } =  req.body;

    // let SQL = "INSERT INTO estoque (ordem, cnpj, fornecedor, entrega, valor, qtd, descri) VALUES (?,?,?,?,?,?,?)";

    // db.query(SQL, [ordem, cnpj, fornecedor, entrega, valor, qtd, descri], (err, result) => {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log("tudo certo")
    //     }
    // });

});

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

app.listen(8080, () => {
    console.log("Server Rodando!")
});