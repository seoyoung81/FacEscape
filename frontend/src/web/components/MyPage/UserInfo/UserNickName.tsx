import styles from './UserInfo.module.css';

interface UserNickNameProps {
    nickName: string | null
}

const UserNickName: React.FC<UserNickNameProps> = ({ nickName }) => {
    return (
        <div>
            <div className={styles.name}>{nickName}</div>
        </div>
    )
};

export default UserNickName;