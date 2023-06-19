const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { format } = require('date-fns')

// CONEXÃO BANCO DE DADOS
const db = mysql.createPool({
    // host:"concipe.com.br",
    // user:"concipecom_fasiclin",
    // password:"db_aluno2023",
    // database: "concipecom_fasiclin",
    host: "localhost",
    user: "root",
    password: "root",
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
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})

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
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})

app.get('/ordem', (req, res) => {
    const SQL = "SELECT * FROM ordem";

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})


app.post("/consultar", (req, res) => {
    const { ordem } = req.body;

    const SQL = `select ordem.valor_ordem as valor, ordem.num_ordem_comp as ordem, fornecedor.razao_social, ordem.cnpj_fornecedor as cnpj from fornecedor, ordem_de_compra as ordem, item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem} and item.num_ordem_comp = ${ordem} and ordem.cnpj_fornecedor = fornecedor.cnpj  limit 1;

    select sum(qtd_produto) as total from ordem_de_compra as ordem, item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem} and item.num_ordem_comp = ${ordem};
    `;

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    });

});

app.post("/cadastrar-lote", (req, res) => {
    // const novoIdLote = resultado[0].id_lote + 1;
    const dataAtual = new Date()
    const dataFormatada = format(dataAtual, 'yyyy-MM-dd HH:mm:ss')
    // console.log(dataFormatada)

    const data = req.body.data;

    for (let i = 0; i < data.length; i++) {
        const produtoAtual = data[i];

        const SQL = `select lote.id_lote, item_ordem_de_compra.unidade_medida from lote inner join item_ordem_de_compra on lote.id_produto = item_ordem_de_compra.id_produto where lote.id_produto = ${produtoAtual.id_produto} and item_ordem_de_compra.id_produto = ${produtoAtual.id_produto};
        `;

        const {
            id_produto,
            num_ordem_comp,
            cnpj_fornecedor,
            data_vecimento,
            qtd_produto
        } = produtoAtual

        const v = new Date(data_vecimento)
        const vencimento = format(v, 'yyyy-MM-dd HH:mm:ss')

        const SQL2 = `insert into lote values(default, ${id_produto}, ${num_ordem_comp}, ${cnpj_fornecedor},'${dataFormatada}', '${vencimento}', 'geral', ${qtd_produto}, ${qtd_produto});`

        db.query(SQL2, (err, result) => {
            if (err) console.log(err)
            else console.log(result)
        })

        // for (let j = 0; j < data.length; j++) {
        //     const produtoAtual = data[i];

        // };
        // console.log(format(data_vencimento, 'dd-MM-yy HH:mm'));

    };

    console.log(data[2]);

    res.send('ok');
})

//PORTAS
app.listen(8080, () => {
    console.log("Server Rodando!");
});