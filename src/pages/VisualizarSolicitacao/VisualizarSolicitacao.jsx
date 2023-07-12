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
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const itemsPerPage = 10;
    // Calcular índices dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Obter os itens da página atual
    const currentPageItems = tabelaListaProduto.slice(startIndex, endIndex);

    // Calcular o número total de páginas
    const totalPages = Math.ceil(tabelaListaProduto.length / itemsPerPage);

    // Função para mudar a página atual
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    // ROTAS
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
            setTimeout(() => handleClose(), 2000)
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
            <Header url='/' titulo='VISUALIZAR SOLICITAÇÕES'/>
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
                                {currentPageItems.map((produto) => (
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
                            onClick={(e) => atenderSolicitacao(solicitacaoAtual)}
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
                        {tabelaSolicitacao.map((solicitacao, index) => (
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

                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={{
                                margin: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: currentPage === index + 1 ? '#0d6efd' : '#fff',
                                color:  currentPage === index + 1 ? '#fff' : '#000',
                                border: currentPage === index + 1 ? 'none' : '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </main>
        </>
    );
};

export default VisualizarSolicitacao;