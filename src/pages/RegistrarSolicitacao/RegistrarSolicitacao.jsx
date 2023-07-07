import React, { useState } from "react";
import Header from '../../components/Header'
import Axios from "axios";

import styles from "./RegistrarSolicitacao.module.scss";
import { Container, Row, Col, Form, Button, Table, Modal, ListGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrarSolicitacao() {
    const [values, setValues] = useState({});
    const [consulta, setConsulta] = useState([])
    const [valorTabela, setValorTabela] = useState([])
    const [isEditing, setIsEditing] = useState(true);
    const [setor, setSetor] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [resultadoProduto, setResultadoProduto] = useState(0);
    const [tabelaResultadoProduto, setTabelaResultadoProduto] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChangeValues = (value) => {
        setValues((data) => ({
            ...data,
            [value.target.name]: value.target.value,
        }));
        console.log(values)
    };

    const mudarValorResultadoProduto = (value) => {
        setResultadoProduto(value)
        console.log(resultadoProduto)
        handleClose()
    }

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
            const permisao = data[0].retirada_estoque
            if (!permisao || permisao === 0) {
                toast.error('Solicitante não tem permissão para realizar retirada no estoque')
                setIsEditing(false)
            } else {
                toast.success('Solicitante com permissão')
                setIsEditing(true);
            }
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const consultarProduto = () => {
        // if (!nomeProduto) {
        //     console.log(values)
        //     toast.error('Preencha todos os campos')
        // } else {

        // }

        Axios.get('http://localhost:8080/consultar-produto', {
            params: {
                produto: nomeProduto
            }
        }).then(({ data }) => {
            setTabelaResultadoProduto(data)
            console.log(data)
            if (!data.length) {
                return toast.error('produto não encontrado, por favor digite novamente')
            } //else {
            //     return addProduto(data[0])
            // }

        }).catch((err) => {
            console.log(err)
        })
    }



    // INTERAÇÕES
    const verificarProdutoNaTabela = (value) => {
        return valorTabela.some((item) => item.id_produto === value)
    }

    const verifica = (value) => verificarProdutoNaTabela(value)

    const addProduto = (value) => {
        setConsulta(value)
        setValorTabela((data) => [...data, { id_produto: value.id_produto, nome: value.nome, medida: value.medida, qtd: values.qtd }])
        // setValues([])
        console.log(valorTabela)
        console.log(setor)
        console.log(consulta)
        console.log(values)

        // if (!values.qtd || !setor) {
        //     return toast.error('preencha todos os campos')
        // } 
        // if (value.qtd < values.qtd) {
        //     return toast.error(`A quantidade solicitada é superior ao estoque, limite ${value.qtd}`)
        // } if (verifica(value.id_produto)) {
        //     return toast.error(`O produto já estar na lista`)
        // } else {
 
        // }
    };


    const deletarItemTabela = (value) => {
        const attTabela = valorTabela.filter((item) => item.id_produto !== value)
        setValorTabela(attTabela)
    }




    return (
        <>
            <ToastContainer />
            <Header url="/" />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pesquisar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite aqui"
                                autoFocus
                                onChange={(e) => setNomeProduto(e.target.value)}
                            />
                        </Form.Group>
                        <Table
                            striped
                            bordered
                            hover
                            >
                            <thead>
                                <tr>
                                    <th>Nome Produto</th>
                                    <th>Uni. Medida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabelaResultadoProduto.map((produto) => (
                                    <tr key={produto.id_produto}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.medida}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={(e) => mudarValorResultadoProduto(produto)}
                                               >
                                                Selecionar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={consultarProduto}>
                        Pesquisar
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                <Form.Label>Produto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Clique aqui"
                                    onClick={handleShow}
                                    value={resultadoProduto.nome}
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
                                    placeholder={!resultadoProduto ? 'pesquisando...' : `disponivel ${resultadoProduto.qtd}`}
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
                                    onChange={(e) => setSetor(e.target.value)}
                                    name='setor'
                                    disabled={!isEditing}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant="primary"
                        // onClick={!resultadoProduto ? '' : addProduto(resultadoProduto)}
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
                        {valorTabela.map((produto) => (
                            <tr key={produto.id_produto}>
                                <td>{produto.nome}</td>
                                <td>{produto.medida}</td>
                                <td>{produto.qtd}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => deletarItemTabela(produto.id_produto)}>
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