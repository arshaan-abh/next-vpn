import styles from "/styles/PageChange.module.css"

export default function PageChange() {
    return (<div className={styles.bg}>
        <div className={styles.loadRing}/>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
    </div>)
}
