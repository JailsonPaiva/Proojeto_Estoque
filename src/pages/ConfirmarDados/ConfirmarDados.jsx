import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import InputMask from "react-input-mask";


import Header from '../../components/Header'
import Tr from '../../components/Tr'

import styles from './ConfirmarDados.module.scss'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ConfirmarDados() {
    const [listDados, setListDados] = useState([]);
    const [listOrdem, setListOrdem] = useState([]);


    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const ordem = params.get('ordem')
    console.log(ordem)

    useEffect(() => {
        Axios.get("http://localhost:8080/confirmar", {
            params: {
                ordem: ordem
            }
        }).then((response) => {
            setListDados(response.data)
        })
    }, []);

    return (
        <>
            <Header url="/cadastrar"/>

            <main>
                <section className={styles.sectionContainer}>

                    <span >Nº  Ordem<br />
                        {!listDados[0] ? '' : listDados[0].num_ordem_comp}
                    </span>

                    <input type="text"
                        name="fornecedor"
                        placeholder='Nome do fornecedor'
                        disabled
                        value={!listDados[0] ? '' : listDados[0].nome_fornecedor} />

                    <InputMask
                        type="text"
                        name="cnpj"
                        placeholder='CNPJ'
                        mask="99.999.999/9999-99"
                        disabled
                        value={!listDados[0] ? '' : listDados[0].cnpj_fornecedor} />

                </section>

                <section className={styles.sectionTable}>

                    <hr />
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nº Produto</th>
                                <th>Nome Produto</th>
                                <th>Descrição</th>
                                <th>Uni. Medida</th>
                                <th>Vencimento</th>
                                <th>QTD</th>
                                <th>Valor</th>
                                <th>Lote</th>
                            </tr>
                        </thead>
                        <tbody>

                            {typeof listDados !== "undefined" && listDados.map((value) => {
                                return (

                                    <Tr
                                        key={value.id_lote}
                                        listDados={listDados}
                                        setListDados={setListDados}
                                        numProduto={value.id_produto}
                                        produto={value.nome_pord}
                                        descri={value.desc_produto}
                                        medida={value.unidade_medida}
                                        vencimento={value.data_vencimento}
                                        qtd={value.qtd_produto}
                                        lote={value.lote}
                                        valor={value.valor}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>

                    <Button variant="success">
                        <Link to="/" className={styles.link}>Próximo</Link>
                    </Button>
                </section>
            </main>
        </>
    );
}

export default ConfirmarDados;