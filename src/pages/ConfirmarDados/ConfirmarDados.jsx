import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from '../../components/Header'
// import Tr from '../../components/Tr'

import styles from './ConfirmarDados.module.scss'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ConfirmarDados() {
    const [listDados, setListDados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate('')
    const itemsPerPage = 10;
    // Calcular índices dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Obter os itens da página atual
    const currentPageItems = listDados.slice(startIndex, endIndex);

    // Calcular o número total de páginas
    const totalPages = Math.ceil(listDados.length / itemsPerPage);

    // Função para mudar a página atual
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const voltarHome = () => {
        setTimeout(() => navigate('/'), 3000)
    }

    // const voltarHome = () => {
    //     toast.success(`Lote cadastrado com sucesso </br> Você será redirecionado para a tela inicial`);
    //     navigate('/');
    // }

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const ordem = params.get('ordem');
    // console.log(ordem)

    //ROTA
    useEffect(() => {
        Axios.get("http://localhost:8080/confirmar", {
            params: {
                ordem: ordem
            }
        }).then(({ data }) => {
            setListDados(data)
            // console.log(data)
        })
    }, []);

    const cadastrarLote = async () => {
        await Axios.post("http://localhost:8080/cadastrar-lote", {
            data: listDados
        }).then((response) => {
            const data = response.data
            if (data === 'erro') {
                toast.error('Ocorreu um erro ao cadastrar o lote no sistema.');
            } if (data === 'ok') {
                toast.success('Itens cadastrado com sucesso.');
                voltarHome()
            }
        })
    }

    //MASCARAS
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
            <ToastContainer />

            <Header url="/cadastrar" />

            <main>
                <section className={styles.sectionContainer}>

                    <span >Nº  Ordem<br/>
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
                    <Table responsive striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome Produto</th>
                                <th>Nº Produto</th>
                                <th>Descrição</th>
                                <th>Uni. Medida</th>
                                <th>Vencimento</th>
                                <th>QTD</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageItems.map((value, index) => {

                                const valorFomatado = formatCurrency(value.valor * value.qtd_produto)

                                return (
                                    <tr key={value.id_produto}>
                                        <td>{index + 1}</td>
                                        <td>{value.nome_prod}</td>
                                        <td>{value.id_produto}</td>
                                        <td>{value.desc_produto}</td>
                                        <td>{value.unidade_medida}</td>
                                        <td>{formatDate(value.data_vencimento)}</td>
                                        <td>{value.qtd_produto}</td>
                                        <td>{valorFomatado}</td>
                                    </tr>
                                );
                            })}
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
                                    color: '#fff',
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

                    <Button variant="success">
                        <Link
                            onClick={cadastrarLote}
                            className={styles.link}>Próximo</Link>
                    </Button>

                </section>
            </main>
        </>
    );
}

export default ConfirmarDados;