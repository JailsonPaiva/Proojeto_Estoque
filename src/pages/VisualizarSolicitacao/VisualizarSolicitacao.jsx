import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Axios from "axios";

import styles from './VisualizarSolicitacao.module.scss'
import { Container, Row, Col, Form, Button, Table, Modal, ListGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function VisualizarSolicitacao() {
    const [tabelaSolicitacao, setTabelaSolicitacao] = useState([]);
    const [tabelaListaProduto, setTabelaListaProduto] = useState([]);
    const [solicitacaoAtual, setSolicitacaoAtual] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        Axios.get("http://localhost:8080/visualizar-solicitacao")
            .then((response) => {
                setTabelaSolicitacao(response.data)
                console.log(response)
            });
        console.log(tabelaSolicitacao)
    }, [show])



    const consultarSolicitacao = (value) => {
        setSolicitacaoAtual(value)
        handleShow()
        Axios.get("http://localhost:8080/consultar-solicitacao", {
            params: {
                data: value
            }
        }).then((response) => {
            console.log(response.data)
            setTabelaListaProduto(response.data)
            console.log(tabelaListaProduto)
        }).catch((err) => {
            console.log(err)
        })

    }

    const atenderSolicitacao = (value) => {
        // console.log(value)
        console.log(solicitacaoAtual)
        Axios.post('http://localhost:8080/atender-solicitacao', {
            data: value
        }).then((response) => {
            setTimeout(() => handleClose(),2000 )
            toast.success('Solicitação atendida.')
            console.log(response)
        }).catch((err) => {
            toast.error('Ocorreu um erro ao antender a sua solicitação, tente novamente.')
            console.log(err)
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <main className={styles.containerTabela}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lista de Produtos Solicitados</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
                            striped
                            bordered
                            hover
                        >
                            <thead>
                                <tr>
                                    <th>Nome Produto</th>
                                    <th>Uni. Medida</th>
                                    <th>QTD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabelaListaProduto.map((produto) => (
                                    <>
                                        <tr key={produto.id_produto}>
                                            <td>{produto.nome}</td>
                                            <td>{produto.medida}</td>
                                            <td>{produto.qtd}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button
                            variant="success"
                            onClick={(e)=> atenderSolicitacao(solicitacaoAtual)}
                        >
                            Atender
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table
                    striped
                    bordered
                    hover
                >
                    <thead>
                        <tr>
                            <th>Nº Solicitação</th>
                            <th>Solicitante</th>
                            <th>Setor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabelaSolicitacao.map((solicitacao) => (
                            <tr key={solicitacao.id_solicitacao}>
                                <td>{solicitacao.id_solicitacao}</td>
                                <td>{solicitacao.solicitante}</td>
                                <td>{solicitacao.setor}</td>
                                <td>
                                    <Button variant="primary" size="sm"
                                        onClick={(e) => consultarSolicitacao(solicitacao.id_solicitacao)}>
                                        Visualizar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </main>
        </>
    );
};

export default VisualizarSolicitacao;