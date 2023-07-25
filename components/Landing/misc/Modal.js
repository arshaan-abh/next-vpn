import React from "react"
import styles from "../../../styles/modal.module.css"

export default function Modal({closeModalHandler}) {
    return <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <div className={styles.closeModalButton} onClick={closeModalHandler}>X</div>
            modal
        </div>
    </div>
}
