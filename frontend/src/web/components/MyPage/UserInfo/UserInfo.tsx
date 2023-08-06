import UserNickName from './UserNickName';
import UserEmail from './UserEmail';
import UserMilage from './UserMileage';
import EditInfo from './EditInfo';

import { authInstance } from '../../../services/api';

import { useEffect, useState } from 'react';

import styles from './UserInfo.module.css';

const UserInfo: React.FC = () =>{

    const [nickName, setNickName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mileage, setMileage] = useState(null);
    const [password, setPassWord] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await authInstance.get('/member');
            setNickName(response.data.nickName);
            setEmail(response.data.email);
            setMileage(response.data.mileage);
            setPassWord(response.data.password);
        } catch (error) {
            console.log(error);
        }
        };
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행하도록 함

  // data를 로그하거나 화면에 출력하는 등 원하는 작업 수행
  useEffect(() => {
    console.log(nickName);
    console.log(email);
    console.log(mileage);
    console.log(password);
  }, []);
  


    return (
        <div className={styles['userinfo-container']}>
            <UserNickName  nickName={nickName} />
            <UserEmail email={email} />
            <UserMilage mileage={mileage} />
            <EditInfo email={email} password={password}  />
        </div>
    )
};

export default UserInfo;
