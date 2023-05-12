import { Link } from 'react-router-dom'

import logo from '../../../public/assets/logo.png'

import styles from './Home.module.scss'
import Table from 'react-bootstrap/Table';


function Home() {
    return (
        <>
            <header className={styles.headerContainer}>
                <img src={logo} alt="Logo FASIPE" />

                <div className={styles.busca}>
                    <input type="text" name="busca" id="busca" />
                    <i class="fa-solid fa-magnifying-glass"></i>
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

                    <Table responsive striped  hover>
                        <thead>
                            <tr>
                                <th>Nº DA ORDEM</th>
                                <th>FORNECEDOR</th>
                                <th>DATA DE RECEBIMETNO</th>
                                <th>VISUAZILAR</th>
                            </tr>
                        </thead>
                        <tbody >

                            <tr>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>

                    <section className={styles.btnContainer}>
                        <button>

                            <Link to="/cadastrar">
                                <i class="fa-solid fa-plus-minus"></i>
                                Cadastrar nova ordem
                            </Link>
                        </button>

                        <div>
                            <button>Reposição de Materiais</button>
                            <button>Fechamento de Balanço</button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home;