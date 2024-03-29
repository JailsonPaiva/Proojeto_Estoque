import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import logo from '../../public/assets/logo.png'

function Header(props) {
    return(
        <header className={styles.headerContainer}>
            <Link to="/">
                <img src={logo} alt="Logo FASIPE" />
            </Link>

            <h2>{props.titulo}</h2>

            <Link to={props.url}>
                <i class="fa-solid fa-circle-arrow-left"></i>
            </Link>
        </header>
    );
}

export default Header;