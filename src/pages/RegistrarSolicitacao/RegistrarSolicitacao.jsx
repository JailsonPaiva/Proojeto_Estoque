import React, { useState } from "react";
import Header from '../../components/Header'
import Axios from "axios";

import styles from "./RegistrarSolicitacao.module.scss";
import { Container, Row, Col, Form, Button, Table, Modal, ListGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function RegistrarSolicitacao() {
    const [values, setValues] = useState({});
    // const [consulta, setConsulta] = useState([])
    const [valorTabela, setValorTabela] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    // const [infoProfissional, setInfoProfissional] = useState([]);
    const [nomeProduto, setNomeProduto] = useState('');
    const [resultadoProduto, setResultadoProduto] = useState([]);
    const [tabelaResultadoProduto, setTabelaResultadoProduto] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const navigate = useNavigate('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const itemsPerPage = 5;
    // Calcular índices dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Obter os itens da página atual
    const currentPageItems = valorTabela.slice(startIndex, endIndex);

    // Calcular o número total de páginas
    const totalPages = Math.ceil(valorTabela.length / itemsPerPage);

    // Função para mudar a página atual
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleChangeValues = (value) => {
        setValues((data) => ({
            ...data,
            [value.target.name]: value.target.value,
        }));
        // console.log(values)
    };

    const mudarValorResultadoProduto = (value) => {
        setResultadoProduto(value)
        // setValorTabela((data) => [...data, { id_produto: value.id_produto, nome: value.nome, medida: value.medida, qtd: values.qtd }])
        // console.log(resultadoProduto)
        console.log(resultadoProduto)
        handleClose()
    }

    const voltarHome = () => {
        setTimeout(() => navigate('/'), 3000)
    }

    // const mudarValorInforProfissional = (value) => { 
    //     setInfoProfissional((data) => ({
    //         ...data,
    //         [value.target.name]: value.target.value,
    //     }))
    // }

    // ROTAS
    const consultarProfissional = async () => {
        if (!values) {
            return toast.error('Digite o nome do solicitante')
        } else {
            await Axios.get('http://localhost:8080/profissional', {
                params: {
                    profissional: values.solicitante
                }
            }).then(({ data }) => {
                if (!data.length) {
                    return toast.error('Nenhum profissional encontrado, tente novamente.')
                } else {
                    console.log(data)
                    const permisao = data[0].retirada_estoque

                    setValues((value) => ({
                        ...value,
                        ['id_profissional']: data[0].id_profissional
                    }));

                    if (!permisao || permisao === 0) {
                        toast.error('Solicitante não tem permissão para realizar retirada no estoque')
                        setIsEditing(false)
                    } else {
                        toast.success('Solicitante com permissão')
                        setIsEditing(true);
                    }
                    // console.log(data);
                }

            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const consultarProduto = () => {
        if (!nomeProduto) {
            // console.log(values)
            toast.error('Digite o nome de um produto.')
        } else {
            Axios.get('http://localhost:8080/consultar-produto', {
                params: {
                    produto: nomeProduto
                }
            }).then(({ data }) => {
                setTabelaResultadoProduto(data);
                console.log(data);
                if (!data.length) {
                    return toast.error('produto não encontrado, por favor digite novamente');
                } //else {
                //     return addProduto(data[0])
                // }

            }).catch((err) => {
                console.log(err)
            });
        }
    };


    const finalizar = () => {
        if (!valorTabela) {
            return toast.error('Adicione um produto a sua solicitação.')
        } else {
            Axios.post('http://localhost:8080/finalizar-solicitacao', {
                data: {
                    values: values,
                    valorTabela: valorTabela
                }
            }).then((response) => {
                // console.log(response)
                Axios.post('http://localhost:8080/novo-lote', {
                    data: {
                        values: values,
                        valorTabela: valorTabela
                    }
                }).then((res) => {
                    console.log(res)

                    if (res.status === 200) {
                        toast.success('Solicitação criada com sucesso!');
                        voltarHome()
    
                    } else toast.error('Ocorreu um erro ao tentar realizar a sua solicitação, por favor tente novamente.');

                }).catch((err) => {
                    console.log(err)
                    return toast.error('Ocorreu um erro ao tentar realizar a sua solicitação, por favor tente novamente.');
                })

            }).catch((err) => {
                console.log(err)
                return toast.error('Ocorreu um erro ao tentar realizar a sua solicitação, por favor tente novamente.');
            })
        }
    }


    // INTERAÇÕES
    const verificarProdutoNaTabela = (value) => {
        return valorTabela.some((item) => item.id_produto === value)
    };

    const verifica = (value) => verificarProdutoNaTabela(value);

    const addProduto = (value) => {
        if (!values.qtd || !values.setor) {
            return toast.error('preencha todos os campos')
        }
        if (value.qtd < values.qtd) {
            return toast.error(`A quantidade solicitada é superior ao estoque, limite ${value.qtd}`)
        } if (verifica(value.id_produto)) {
            return toast.error(`O produto já estar na lista`)
        } else {
            setValorTabela((data) => [...data, { id_produto: value.id_produto, nome: value.nome, medida: value.medida, qtd: values.qtd, ordem: resultadoProduto.ordem, vencimento: resultadoProduto.vencimento, cnpj: resultadoProduto.cnpj, lote: resultadoProduto.lote, qtd_lote: resultadoProduto.qtd }]);

            setTabelaResultadoProduto([]);

            console.log(valorTabela);
            console.log(values);
        };
    };


    const deletarItemTabela = (value) => {
        const attTabela = valorTabela.filter((item) => item.id_produto !== value)
        setValorTabela(attTabela)
    }




    return (
        <>
            <ToastContainer />
            <Header url="/" titulo='REGISTRAR SOLICITAÇÃO'/>
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
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Select
                                aria-label="Default select example"
                                value={values.setor}
                                name='setor'
                                onChange={handleChangeValues}
                                disabled={!isEditing}>

                                <option>Selecione o Setor</option>
                                <option value="Biomedicina">Biomedicina</option>
                                <option value="Enfermagem">Enfermagem</option>
                                <option value="Estética">Estética</option>
                                <option value="Fisioterapia">Fisioterapia</option>
                                <option value="Nutrição">Nutrição</option>
                                <option value="Odontologia">Odontologia</option>
                                <option value="Psicologia">Psicologia</option>
                                <option value="NPJ">NPJ</option>
                                <option value="Medicina">Medicina</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button
                        variant="primary"
                        onClick={(e) => addProduto(resultadoProduto)}
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
                        {currentPageItems.map((produto, index) => (
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

                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                style={{
                                    margin: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: currentPage === index + 1 ? '#0d6efd' : '#fff',
                                    color: currentPage === index + 1 ? '#fff' : '#000',
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

                    <Row className="mt-2 mx-1">
                        <Button variant="success" size="md" disabled={!isEditing} onClick={finalizar}>
                            Finalizar
                        </Button>
                    </Row>
                    
                </Table>
            </Container>
        </>
    );
};

export default RegistrarSolicitacao;