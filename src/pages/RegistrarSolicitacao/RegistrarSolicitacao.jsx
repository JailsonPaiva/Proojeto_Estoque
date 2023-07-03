import React, { useState } from "react";
import Header from '../../components/Header'
import Axios from "axios";

import styles from "./RegistrarSolicitacao.module.scss";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrarSolicitacao() {
    const [values, setValues] = useState({});
    const [consulta, setConsulta] = useState([])
    const [isEditing, setIsEditing] = useState(true);


    const handleChangeValues = (value) => {
        setValues((data) => ({
            ...data,
            [value.target.name]: value.target.value,
        }));
    };

    const produtos = [
        { id: 1, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        { id: 2, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
        // { id: 3, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        // { id: 4, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
        // { id: 5, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        // { id: 6, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
        // { id: 7, nome: 'Produto 1', unidadeMedida: 'kg', quantidade: 5 },
        // { id: 8, nome: 'Produto 2', unidadeMedida: 'l', quantidade: 3 },
    ];


    const s = () => console.log(values);

    // ROTAS
    const consultarProfissional = async () => {
        await Axios.get('http://localhost:8080/profissional', {
            params: {
                profissional: values.solicitante
            }
        }).then(({ data }) => {
            const permisao = data.retirada_estoque
            if (!permisao || permisao === false) {
                toast.error('Solicitante não tem permissão para realizar retirada no estoque')
            } else {
                handleDisableEdit()
            }
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const consultarProduto = async () => {
        await Axios.get('http://localhost:8080/consultar-produto', {
            params: {
                produto: values.produto
            }
        }).then(({data}) => {
            // console.log(data)
            setConsulta(data)
            console.log(consulta)
        }).catch((err) => {
            console.log(err)
        })
    }

    // INTERAÇÕES
    const handleDisableEdit = () => {
        setIsEditing(true);
    };

    const addProsuto = () => {
        produtos.push(
            // {
            //     id: values.produto, nome: 
            // }
        )
    }


    return (
        <>
            <ToastContainer />
            <Header url="/" />
            <Container className={styles.container}>
                <Form className={styles.form}>
                    <h3>Registrar Solicitação</h3>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group controlId="formNomeSolicitante">
                                <Form.Label>Nome do Solicitante</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do solicitante"
                                    onChange={handleChangeValues}
                                    name='solicitante'
                                    onBlur={consultarProfissional}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="formNumProduto">
                                <Form.Label>Nº do Produto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o número do produto"
                                    onChange={handleChangeValues}
                                    name='produto'
                                    disabled={!isEditing}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="formQtd">
                                <Form.Label>
                                    <abbr title="Quantidade total no estoque">QTD</abbr>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={!consulta[0] ? 'pesquisando...': `disponivel ${consulta[0].qtd}`}
                                    onChange={handleChangeValues}
                                    // value={values.qtd}
                                    name='qtd'
                                    disabled={!isEditing}
                                    min={0}
                                // max={values.qtd}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group controlId="formNomeSetor">
                                <Form.Label>Nome do Setor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do setor"
                                    onChange={handleChangeValues}
                                    name='setor'
                                    disabled={!isEditing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant="primary"
                        onClick={consultarProduto}
                    // onClick={s}
                    >
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
                    <Button variant="success" disabled={!isEditing}>
                        Finalizar
                    </Button>
                </Table>
            </Container>
        </>
    );
};

export default RegistrarSolicitacao;