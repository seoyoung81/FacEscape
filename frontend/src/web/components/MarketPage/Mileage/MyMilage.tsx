import { useState, useEffect } from 'react';
import { authInstance } from '../../../services/api';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../../store/store';
import styles from './MyMilage.module.css';


const MyMilage :React.FC = () => {
    const [myMileage, setMyMileage] = useState<number | null>(null);
    const mileageRender = useSelector((state: RootState) => state.mileageRender);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await authInstance.get('/member');
                setMyMileage(response.data.mileage);
                console.log(response.data.mileage);
            } catch (error) {
                setMyMileage(0);
                console.log('mileage Error', error)
            }
        };

        fetchData();
    }, [myMileage, mileageRender]);

    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>{myMileage}&nbsp;M</div>
            </div>
        </div>

    )
}

export default MyMilage;