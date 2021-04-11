import styles from "./Intro.module.css"


function Intro(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.intro}>Your Online Budget Tracker</div>
        </div>
    )
}

export default Intro