import styles from './CadastrarOrdem.module.scss'


function CadastrarOrdem() {
    return( 
        <>
             <header className={styles.headerContainer}>
                <div className={styles.logo}>logo</div>

                <div className={styles.busca}>
                    <h3>Cadastrar nova ordem de compra</h3>
                </div>

            </header>
        </>
    )
}

export default CadastrarOrdem();