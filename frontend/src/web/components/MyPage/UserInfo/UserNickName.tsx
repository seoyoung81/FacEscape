import styles from './UserInfo.module.css';
import Icon from '../../Common/userIcon';

interface UserNickNameProps {
    nickName: string | null
}

const UserNickName: React.FC<UserNickNameProps> = ({ nickName }) => {
    return (
        <div>
            <div className={styles.name}>
                <div className={'user-icon'}>
                    <Icon />
                </div>
                {nickName}
            </div>
        </div>
    )
};

export default UserNickName;