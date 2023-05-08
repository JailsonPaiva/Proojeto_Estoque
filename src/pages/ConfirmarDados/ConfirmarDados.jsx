import Header from '../../components/Header'

import styles from './ConfirmarDados.module.scss'

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ConfirmarDados() {
    return(
        <>
            <Header />

            <main>
                <section className={styles.sectionContainer}>
                    <span>Nº ordem <br /> 17348</span>

                    <input type="text" name="fornecedor" placeholder='Nome do fornecedor' />

                    <input type="text" name="cnpj" placeholder='CNPJ' />

                </section>

                <section className={styles.sectionTable}>

                    <hr />
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
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