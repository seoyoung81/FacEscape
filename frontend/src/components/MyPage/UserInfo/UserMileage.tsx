import styles from './UserInfo.module.css';

const UserMilage: React.FC = () => {
    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>1260&nbsp;M</div>
            </div>
        </div>
    )
};

export default UserMilage;