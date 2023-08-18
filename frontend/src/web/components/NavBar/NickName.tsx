import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { authInstance } from '../../services/api';
import { useState, useEffect } from 'react';
import Icon from '../Common/userIcon';


const MyPage: React.FC = () => {

    const [gameNickname, setGameNickname] = useState<string>("");
    const fetchData = async () => {
        try {
            const { data } = await authInstance.get('/member')
            setGameNickname(data.nickname);

        } catch(error) {
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            className={styles['sign-up']}
            style={{ width: '350px', fontFamily: 'MyFont' }}
         >
            <Icon />
            {gameNickname}
        </div>
    )
}

export default MyPage;
