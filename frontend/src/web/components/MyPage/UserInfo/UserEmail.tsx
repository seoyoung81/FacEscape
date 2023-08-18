import styles from './UserInfo.module.css';

interface UserEmailProps {
    email: string | null
}

const UserEmail: React.FC<UserEmailProps> = ({ email }) => {
    return (
        <div>
            <div className={styles.email}>{email}</div>
        </div>
    )
};

export default UserEmail;