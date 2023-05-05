import styles from './Home.module.scss'

function Home() {
    return(
        <>
            <header className={styles.headerContainer}>
                <div className={styles.logo}>logo</div>

                <div className={styles.busca}>
                    <input type="text" name="busca" id="busca" />
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <i class="fa-solid fa-bars"></i>
            </header>

            <main className={styles.mainContainer}>
                <div className={styles.info}>
                    <h2>RECEBER MATERIAIS</h2>
                    <span>HISTÓRICO DE RECEBIMENTO</span>
                    <hr />
                </div>

                <section className={styles.tableContainer}>
                    <table>
                        <tr>
                            <th>Nº DA ORDEM</th>
                            <th>FORNECEDOR</th>
                            <th>DATA DE RECEBIMETNO</th>
                            <th>VISUAZILAR</th>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                        <tr>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                            <td>teste</td>
                        </tr>
                    </table>

                    <section className={styles.btnContainer}>
                        <button>
                            <i class="fa-solid fa-plus"></i>
                            RECEBER NOVA ORDEM
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