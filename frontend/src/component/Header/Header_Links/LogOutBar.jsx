import styles from "./LogOutBar.module.css"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";

function LogOutBar() {
    const auth = useContext(AuthContext)
    const logOut = (event) => {
        auth.logout()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.acc}>{auth.username}</div>
            <div className={styles.wrapper_button} onClick={logOut}>
                <Link to="/" className={styles.logOut}>
                    LogOut
                </Link>
            </div>
        </div>
    )
}

export default LogOutBar