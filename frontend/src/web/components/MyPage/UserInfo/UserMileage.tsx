import styles from './UserInfo.module.css';

interface UserMileageProps {
    mileage: number | null
}

const UserMilage: React.FC<UserMileageProps> = ({ mileage }) => {
    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>{mileage}&nbsp;M</div>
            </div>
        </div>
    )
};

export default UserMilage;