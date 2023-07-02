import React from "react";
import Header from '../../components/Header'

import styles from "./RegistrarSolicitacao.module.scss"
import { Container, Row, Col, Form, Button, Table} from 'react-bootstrap';

function RegistrarSolicitacao() {

    const produtos = [
        { id: 1, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        { id: 2, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
        { id: 1, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        { id: 2, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 }, { id: 1, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        { id: 2, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 }, { id: 1, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        { id: 2, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
        // Adicione mais objetos aqui para ter um total de 10 linhas
      ];

    return (
        <>
            <Header />
            <Container className={styles.container}>
                <Form className={styles.form}>
                    <h3>Registrar Solicitação</h3>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group controlId="formNomeSolicitante">
                                <Form.Label>Nome do Solicitante</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do solicitante" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="formNumProduto">
                                <Form.Label>Nº do Produto</Form.Label>
                                <Form.Control type="text" placeholder="Digite o número do produto" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="formQtd">
                                <Form.Label>QTD</Form.Label>
                                <Form.Control type="number" placeholder="Digite a quantidade" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group controlId="formNomeSetor">
                                <Form.Label>Nome do Setor</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do setor" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary">
                        Adicionar
                    </Button>
                </Form>

                <Table 
                    striped 
                    bordered 
                    hover 
                    className={styles.tabela}>
                    <thead>
                        <tr>
                            <th>Nome Produto</th>
                            <th>Uni. Medida</th>
                            <th>QTD</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.unidadeMedida}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleRemover(produto.id)}>
                                        Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Button variant="success">
                        Finalizar
                    </Button>
                </Table>
            </Container>
        </>
    );
};

export default RegistrarSolicitacao;