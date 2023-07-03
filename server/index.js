const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { format } = require('date-fns')

// CONEXÃO BANCO DE DADOS
const db = mysql.createPool({
    host: "concipe.com.br",
    user: "concipecom_fasiclin",
    password: "db_aluno2023",
    database: "concipecom_fasiclin",
    // host: "localhost",
    // user: "root",
    // password: "root",
    // database: "estoque",
    multipleStatements: true // Habilita queries múltiplas
});


// SERVER CONFIG
app.use(cors());
app.use(express.json());

//ROTAS 

app.get("/", (req, res) => {
    const dataAtual = new Date()
    const dataFormatada = format(dataAtual, 'yyyy-MM-dd')

    // const SQL = 'select ordem_de_compra.num_ordem_comp, ordem_de_compra.data_entrega, ordem_de_compra.valor_ordem ,fornecedor.nome_fornecedor from ordem_de_compra     inner join fornecedor on fornecedor.cnpj = ordem_de_compra.cnpj_fornecedor;'

    const SQL = `select est_ordem_de_compra.num_ordem_comp, est_ordem_de_compra.data_entrega, est_ordem_de_compra.valor_ordem ,est_fornecedor.nome_fornecedor 
    from est_ordem_de_compra inner join est_fornecedor on est_fornecedor.cnpj = est_ordem_de_compra.cnpj_fornecedor
    where est_ordem_de_compra.data_recebimento is null;`

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})


app.post("/consultar", (req, res) => {
    const { ordem } = req.body;

    const SQL = `select est_ordem_de_compra.valor_ordem as valor, est_ordem_de_compra.num_ordem_comp as ordem, est_ordem_de_compra.data_recebimento, est_fornecedor.razao_social, est_ordem_de_compra.cnpj_fornecedor 
    as cnpj, est_fornecedor.cnae from est_fornecedor, est_ordem_de_compra , est_item_ordem_de_compra where est_ordem_de_compra.num_ordem_comp = ${ordem}
    and est_item_ordem_de_compra.num_ordem_comp = ${ordem} and est_ordem_de_compra.cnpj_fornecedor = est_fornecedor.cnpj  limit 1;
    
    select sum(qtd_produto) as total from est_ordem_de_compra as ordem, est_item_ordem_de_compra as item where ordem.num_ordem_comp = ${ordem}
    and item.num_ordem_comp = ${ordem};
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



app.get('/confirmar', (req, res) => {
    const { ordem } = req.query;
    console.log(ordem)

    // const SQL = `select item_ordem_de_compra.id_produto, produto.nome_pord, produto.desc_produto, 
    // item_ordem_de_compra.unidade_medida, fornecedor.nome_fornecedor, ordem_de_compra.num_ordem_comp, ordem_de_compra.cnpj_fornecedor,
    // item_ordem_de_compra.qtd_produto, item_ordem_de_compra.valor, lote.data_vecimento, lote.id_lote
    // from produto inner join item_ordem_de_compra on item_ordem_de_compra.id_produto = produto.id_produto
    // inner join lote on lote.num_ordem_comp = item_ordem_de_compra.num_ordem_comp
    // inner join ordem_de_compra on ordem_de_compra.num_ordem_comp = item_ordem_de_compra.num_ordem_comp
    // inner join fornecedor on fornecedor.cnpj = ordem_de_compra.cnpj_fornecedor
    // where item_ordem_de_compra.num_ordem_comp = ${ordem} and item_ordem_de_compra.id_produto = lote.id_produto
    // and ordem_de_compra.cnpj_fornecedor = fornecedor.cnpj;
    // `;

    const SQL = `select est_item_ordem_de_compra.id_produto, est_produto.nome_prod, est_produto.desc_produto, 
    est_item_ordem_de_compra.unidade_medida, est_fornecedor.nome_fornecedor, est_ordem_de_compra.num_ordem_comp, est_ordem_de_compra.cnpj_fornecedor,
    est_item_ordem_de_compra.qtd_produto, est_item_ordem_de_compra.valor, est_item_ordem_de_compra.data_vencimento
    from est_produto inner join est_item_ordem_de_compra on est_item_ordem_de_compra.id_produto = est_produto.id_produto
	inner join est_ordem_de_compra on est_ordem_de_compra.num_ordem_comp = est_item_ordem_de_compra.num_ordem_comp
    inner join est_fornecedor on est_fornecedor.cnpj = est_ordem_de_compra.cnpj_fornecedor
    where est_item_ordem_de_compra.num_ordem_comp = ${ordem} and est_ordem_de_compra.cnpj_fornecedor = est_fornecedor.cnpj order by id_produto ASC;`

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})

app.get('/ordem', (req, res) => {
    const SQL = "SELECT * FROM est_ordem_de_compra";

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})


app.get('/profissional', (req, res) => {
    const { profissional } = req.query;
    
    const SQL = `select * from ag_profissional where nome_profissional like "${profissional}";`

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})

app.get('/consultar-produto', (req, res) => {
    const { produto } = req.query;
    
    const SQL = `select produto.nome_prod as nome, produto.unidade_medida as medida, lote.qtd_produto as qtd, produto.id_produto from est_lote as lote
    inner join est_produto as produto on lote.id_produto = ${produto} and produto.id_produto = ${produto} order by qtd desc limit 1;`

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else res.send(result)
    })
})

app.post("/cadastrar-lote", (req, res) => {
    // const novoIdLote = resultado[0].id_lote + 1;
    const dataAtual = new Date()
    const dataFormatada = format(dataAtual, 'yyyy-MM-dd')
    // console.log(dataFormatada)

    const data = req.body.data;

    for (let i = 0; i < data.length; i++) {
        const produtoAtual = data[i];

        // const SQL = `select est_lote.id_lote, item_ordem_de_compra.unidade_medida from lote inner join item_ordem_de_compra on lote.id_produto = item_ordem_de_compra.id_produto where lote.id_produto = ${produtoAtual.id_produto} and item_ordem_de_compra.id_produto = ${produtoAtual.id_produto};
        // `;

        const {
            id_produto,
            num_ordem_comp,
            cnpj_fornecedor,
            data_vencimento,
            qtd_produto
        } = produtoAtual
        // const v = new Date(data_vencimento)
        // const vencimento = format(v, 'yyyy-MM-dd HH:mm:ss')
        // console.log(vencimento)

        // const SQL2 = `insert into lote values(default, ${id_produto}, ${num_ordem_comp}, ${cnpj_fornecedor},'${dataFormatada}', '${vencimento}', 'geral', ${qtd_produto}, ${qtd_produto});`
        const SQL2 = `insert into est_lote values(default, ${id_produto}, ${num_ordem_comp}, ${cnpj_fornecedor},
            '${dataFormatada}', '${data_vencimento}', 'fasiclin', ${qtd_produto});
            update est_ordem_de_compra set data_recebimento = ${dataFormatada} where num_ordem_comp = ${num_ordem_comp};`

        db.query(SQL2, (err, result) => {
            // if (err) {
            //     console.log(err)
            // } else console.log(result)
        })

    };
        const SQL3 = `update est_ordem_de_compra set data_recebimento = '${dataFormatada}' where num_ordem_comp = ${data[0].num_ordem_comp};`;
        db.query(SQL3);
    res.send('ok')
})

//PORTAS
app.listen(8080, () => {
    console.log("Server Rodando!");
});