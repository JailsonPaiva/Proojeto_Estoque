import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

import logo from '../../../public/assets/logo.png'
import TrHome from '../../components/TrHome';

import styles from './Home.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


function Home() {
    const [listDados, setListDados] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8080/")
            .then((response) => {
                setListDados(response.data)
                console.log(response.data)
            })
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    function formatCurrency(value) {
        const options = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        const formattedValue = value.toLocaleString('pt-BR', options);
        return formattedValue;
    }


    return (
        <>
            <header className={styles.headerContainer}>
                <Link to="/">
                    <img src={logo} alt="Logo FASIPE" />
                </Link>

                <div className={styles.busca}>
                    {/* <input type="text" name="busca" id="busca" />
                    <i class="fa-solid fa-magnifying-glass"></i> */}
                    <h2>SISTEMA DE ESTOQUE</h2>
                </div>

                <i class="fa-solid fa-bars"></i>
            </header>

            <main className={styles.mainContainer}>
                <div className={styles.info}>
                    <h2>RECEBER MATERIAIS</h2>
                    <span>ORDEM A RECEBER</span>
                    <hr />
                </div>

                <section className={styles.tableContainer}>

                    <Table responsive striped hover>
                        <thead>
                            <tr>
                                <th>Nº DA ORDEM</th>
                                <th>FORNECEDOR</th>
                                <th>PREVISÃO ENTREGA</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tbody >

                            {typeof listDados !== "undefined" && listDados.map((value) => {
                                return (

                                    <TrHome
                                        key={value.num_ordem_comp}
                                        listDados={listDados}
                                        numOrdem={value.num_ordem_comp}
                                        fornecedor={value.nome_fornecedor}
                                        dataEntrega={formatDate(value.data_entrega)}
                                        valor={formatCurrency(value.valor_ordem)}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>

                    <section className={styles.btnContainer}>
                        <Button variant="success">
                            <Link to="/cadastrar">
                                <i class="fa-solid fa-plus-minus"></i>
                                Verificar nova ordem
                            </Link>
                        </Button>

                        <Row>
                            <Button variant="primary">
                                <Link to="/solicitacao">
                                    Solicitar Materiais
                                </Link>
                            </Button>

                            <Button variant="primary">
                                <Link to="/visualizar-solicitacao">
                                    Visualizar Solicitações
                                </Link>
                            </Button>
                        </Row>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home;