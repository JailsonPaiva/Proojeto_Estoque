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

app.get("/", (req, res) => {
    const SQL = 'select ordem_de_compra.num_ordem_comp, ordem_de_compra.data_entrega, ordem_de_compra.valor_ordem ,fornecedor.nome_fornecedor from ordem_de_compra     inner join fornecedor on fornecedor.cnpj = ordem_de_compra.cnpj_fornecedor;'

    
    db.query(SQL, (err, result) => {
        if(err) {
            console.log(err)
        } else res.send(result)
    })
})

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

// app.get("/consultarOrdem", (req, res) => {
    
// })

app.get('/confirmar', (req, res) => {
    const { ordem } = req.query;
    console.log(ordem)
    
    const SQL = `select item_ordem_de_compra.id_produto, produto.nome_pord, produto.desc_produto, 
    item_ordem_de_compra.unidade_medida, fornecedor.nome_fornecedor, ordem_de_compra.num_ordem_comp, ordem_de_compra.cnpj_fornecedor,
    item_ordem_de_compra.qtd_produto, item_ordem_de_compra.valor, lote.data_vecimento, lote.id_lote
    from produto inner join item_ordem_de_compra on item_ordem_de_compra.id_produto = produto.id_produto
    inner join lote on lote.num_ordem_comp = item_ordem_de_compra.num_ordem_comp
	inner join ordem_de_compra on ordem_de_compra.num_ordem_comp = item_ordem_de_compra.num_ordem_comp
    inner join fornecedor on fornecedor.cnpj = ordem_de_compra.cnpj_fornecedor
    where item_ordem_de_compra.num_ordem_comp = ${ordem} and item_ordem_de_compra.id_produto = lote.id_produto
    and ordem_de_compra.cnpj_fornecedor = fornecedor.cnpj;
    `;

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