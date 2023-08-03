import styles from './MainPageComponent.module.css';

const GameName: React.FC = () => {
    return (
        <div className={styles['game-name']}>
            <span className={styles.E}>F</span>ac<span className={styles.E}>E</span>scape
        </div>
    )
}

export default GameName;

