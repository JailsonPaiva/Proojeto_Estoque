import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import logo from '../../public/assets/logo.png'

function Header(props) {
    return(
        <header className={styles.headerContainer}>
            <img src={logo} alt="Logo FASIPE" />

            <h2>CADASTRAR NOVA ORDEM DE COMPRAS</h2>

            <Link to={props.url}>
                <i class="fa-solid fa-circle-arrow-left"></i>
            </Link>
        </header>
    );
}

export default Header;