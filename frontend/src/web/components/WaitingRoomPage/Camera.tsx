import styles from './WaitingRoom.module.css';

const Camera: React.FC = () => {
    return (
        <div className={styles['box-container']}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
        </div>
    )
};

export default Camera;