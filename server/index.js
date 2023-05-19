const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// CONEXÃO BANCO DE DADOS
const db = mysql.createPool({
    // host:"concipe.com.br",
    // user:"concipecom_fasiclin",
    // password:"db_aluno2023",
    // database: "concipecom_fasiclin"
    host:"localhost",
    user:"root",
    password:"root",
    database: "estoque",
    multipleStatements: true // Habilita queries múltiplas
});


// SERVER CONFIG
app.use(cors());
app.use(express.json());

//ROTAS 
app.post("/consultar", (req, res) =>{
    const { ordem } =  req.body;

    const SQL = `select ordem.valor_ordem as valor, ordem.num_ordem_comp as ordem, fornecedor.razao_social, ordem.cnpj_fornecedor as cnpj from fornecedor, ordem_de_compra as ordem, item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem} and item.num_ordem_comp = ${ordem} and ordem.cnpj_fornecedor = fornecedor.cnpj  limit 1;

    select sum(qtd_produto) as total from ordem_de_compra as ordem, item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem} and item.num_ordem_comp = ${ordem};
    `;

    db.query(SQL,   (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    });

});

app.post('/valor', (req, res) => {
    const { ordem } = req.body;

    const SQL2 = `select sum(qtd_produto) as total from ordem_de_compra as ordem, item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem} and item.num_ordem_comp = ${ordem} `;

    db.query(SQL2,   (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    });
})



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