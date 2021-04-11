import styles from "./LogInBar.module.css"
import {Link} from "react-router-dom";

function LogInBar() {
    return (
        <div className={styles.wrapper}>
            <Link to="/login" className={styles.logIn}>
                LogIn
            </Link>
        </div>
    )
}

export default LogInBar