import { useState, useEffect } from 'react';
import { authInstance } from '../../../services/api';
import styles from './MyMilage.module.css';


const MyMilage :React.FC = () => {
    const [myMileage, setMyMileage] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await authInstance.get('/member');
                    setMyMileage(response.data.mileage);
            } catch (error) {
                console.log('mileage Error', error)
            }
        };

        fetchData();
    }, [myMileage]);

    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>{myMileage}&nbsp;M</div>
            </div>
        </div>

    )
}

export default MyMilage;