import UserNickName from './UserNickName';
import UserEmail from './UserEmail';
import UserMilage from './UserMileage';
import EditInfo from './EditInfo';

import { defaultInstance } from '../../../services/api';

import { useEffect } from 'react';

import styles from './UserInfo.module.css';

const UserInfo: React.FC = () =>{

    const onClick = async () => {
        
        try {
        const { data } = await defaultInstance.get(
            '/member',
        )
        console.log(data);
        return data; 
        } catch (error: any) {
            console.log(error);
        }
    }
  


    return (
        <div className={styles['userinfo-container']}>
            <UserNickName />
            <UserEmail />
            <UserMilage />
            <EditInfo />
            <div onClick={onClick} >
                불러오기
            </div>
        </div>
    )
};

export default UserInfo;