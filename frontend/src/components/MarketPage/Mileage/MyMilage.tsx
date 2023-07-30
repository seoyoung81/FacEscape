import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import  { UserState } from '../../../store/store';
import styles from './MyMilage.module.css';


const MyMilage :React.FC = () => {
    const [myMileage, setMyMileage] = useState<number | null>(null);
    
    const token = useSelector((state: UserState) => state.token);
    console.log('토큰:', token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        axios.get('/member')
            .then((response: AxiosResponse) => {
                console.log(response.data.mileage);
                setMyMileage(response.data.mileage);
            })
            .catch(error => console.error('Error: ', error));
    }, [])

    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>{myMileage ? myMileage : '1260'}&nbsp;M</div>
            </div>
        </div>

    )
}

export default MyMilage;