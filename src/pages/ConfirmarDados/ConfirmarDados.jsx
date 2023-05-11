import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../components/Header'

import styles from './ConfirmarDados.module.scss'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ConfirmarDados() {
    const [listDados, setListDados] = useState([]);
    console.log(listDados)

    useEffect(() => {
        Axios.get("http://localhost:8080/confirmar").then((response) => {
            setListDados(response.data)
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
                                <input type="text" name="fornecedor" placeholder='Nome do fornecedor' value={listDados[0].fornecedor} disabled/>
                                <input type="text" name="cnpj" placeholder='CNPJ' value={listDados[0].cnpj} disabled/>
                            </>
                        );
                    })}

                    

                </section>

                <section className={styles.sectionTable}>

                    <hr />
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nº Ordem</th>
                                <th>Nome Produto</th>
                                <th>Descrição</th>
                                <th>Uni. Medida</th>
                                <th>Vencimento</th>
                                <th>QTD</th>
                                <th>Lote</th>
                            </tr>
                        </thead>
                        <tbody>

                            {typeof listDados !== "undefined" && listDados.map((value) => {
                                return(
                                    <Tr 
                                        key={value.id}
                                        listDados={listDados}
                                        setListDados={setListDados}
                                        id={value.id}
                                        numProduto={value.numProduto}
                                        produto={value.produto}
                                        descri={value.descri}
                                        medida={value.medida}
                                        vencimento={value.vencimento}
                                        qtd={value.qtd}
                                        lote={value.lote}
                                    >

                                    </Tr>
                                );
                            })}

                            <tr>
                                <td>1</td>

                                {/* {typeof listDados !== "undefined" && listDados.map((value) => {
                                    return (
                                            <>
                                                <td>{value.ordem}</td>
                                                <td>{value.fornecedor}</td>
                                                <td>{value.descri}</td>
                                                <td>{value.entrega}</td>
                                                <td>{value.cnpj}</td>
                                                <td>{value.qtd}</td>
                                                <td>{value.valor}</td>
                                            </>
                                        );
                                })} */}

                            </tr>
                            <tr>
                                <td>2</td>
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>3</td>
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
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