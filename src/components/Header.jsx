import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import logo from '../../public/assets/logo.png'

function Header() {
    return(
        <header className={styles.headerContainer}>
            <img src={logo} alt="Logo FASIPE" />

            <h2>CADASTRAR NOVA ORDEM DE COMPRAS</h2>

            <Link to="/">
                <i class="fa-solid fa-house-chimney"></i>
            </Link>
        </header>
    );
}

export default Header;