import styles from './Header.module.scss'

import logo from '../../public/assets/logo.png'

function Header() {
    return(
        <header className={styles.headerContainer}>
            <img src={logo} alt="Logo FASIPE" />

            <h2>CADASTRAR NOVA ORDEM DE COMPRAS</h2>

            <i class="fa-solid fa-bars"></i> 
        </header>
    );
}

export default Header;