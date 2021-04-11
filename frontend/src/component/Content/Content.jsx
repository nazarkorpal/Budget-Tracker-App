import styles from './Content.module.css';
import {useRoutes} from "../../routes"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function Content(props) {
    const auth = useContext(AuthContext)
    const routes = useRoutes(!auth.isAuthenticated)
    return (
        <div className={styles.content_body}>
            <div className={styles.wrapper}>{routes}</div>
        </div>
    )
}

export default Content;