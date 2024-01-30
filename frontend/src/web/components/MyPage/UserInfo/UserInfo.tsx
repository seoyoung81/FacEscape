import UserNickName from './UserNickName';
import UserEmail from './UserEmail';
import UserMilage from './UserMileage';
import EditInfo from './EditInfo';

import { authInstance } from '../../../api/instance';

import { useEffect, useState } from 'react';

import styles from './UserInfo.module.css';

const UserInfo: React.FC = () =>{

    const [nickName, setNickName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mileage, setMileage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await authInstance.get('/member');
            setNickName(response.data.nickname);
            setEmail(response.data.email);
            setMileage(response.data.mileage);
        } catch (error) {
        }
        };
    fetchData();
  }, [nickName, email, mileage ]);

    return (
        <div className={styles['userinfo-container']}>
            <UserNickName  nickName={nickName} />
            <UserEmail email={email} />
            <UserMilage mileage={mileage} />
            <EditInfo nickName={nickName} setNickName={setNickName} />
        </div>
    )
};

export default UserInfo;
