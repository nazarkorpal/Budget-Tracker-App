import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {LogInOut} from "./Header_Links/headerRoute";


function Header() {
    return (
        <div className={styles.wrapper}>
        <div className={styles.header_body}>
           <Link to="/"  className={styles.header_logo}>
               Budget Tracker App
           </Link>
            {LogInOut()}
        </div>
        </div>
    )
}

export default Header;