import UserNickName from './UserNickName';
import UserEmail from './UserEmail';
import UserMilage from './UserMileage';
import EditInfo from './EditInfo';

import styles from './UserInfo.module.css';

const UserInfo: React.FC = () => {
    return (
        <div className={styles['userinfo-container']}>
            <UserNickName />
            <UserEmail />
            <UserMilage />
            <EditInfo />
        </div>
    )
};

export default UserInfo;