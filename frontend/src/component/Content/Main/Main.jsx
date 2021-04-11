import styles from "./Main.module.css"
import MainContent from "./MainContent/MainContent";

function Main(){
    return(
        <div className={styles.wrapper}>
            <MainContent/>
        </div>
    )
}
export default Main