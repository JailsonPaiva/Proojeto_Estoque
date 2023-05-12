import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../components/Header'
import Tr from '../../components/Tr'

import styles from './ConfirmarDados.module.scss'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ConfirmarDados() {
    const [listDados, setListDados] = useState([]);
    const [listOrdem, setListOrdem] = useState([]);
    console.log(listOrdem)

    useEffect(() => {
        Axios.get("http://localhost:8080/confirmar").then((response) => {
            setListDados(response.data)
        }),

            Axios.get("http://localhost:8080/ordem").then((response) => {
                setListOrdem(response.data)
            });
    }, []);

    return (
        <>
            <Header />

            <main>
                <section className={styles.sectionContainer}>
                    {typeof listDados !== "undefined" && listDados.map((value) => {
                        return (
                            <>
                                <span >Nº  Ordem<br />{value.ordem}</span>
                                <input type="text" name="fornecedor" placeholder='Nome do fornecedor' value={listDados[0].fornecedor} disabled />
                                <input type="text" name="cnpj" placeholder='CNPJ' value={listDados[0].cnpj} disabled />
                            </>
                        );
                    })}



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

                            {typeof listOrdem !== "undefined" && listOrdem.map((value) => {
                                return (

                                    <Tr
                                        key={value.id}
                                        listDados={listOrdem}
                                        setListDados={setListDados}
                                        id={value.id}
                                        numProduto={value.numProduto}
                                        nomeProduto={value.nomeProduto}
                                        produto={value.produto}
                                        descri={value.descri}
                                        medida={value.medida}
                                        vencimento={value.vencimento}
                                        qtd={value.qtd}
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