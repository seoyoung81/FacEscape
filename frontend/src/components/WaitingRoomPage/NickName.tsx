import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './WaitingRoom.module.css';

const NickName = () => {
    const nickName = useSelector((state: RootState) => state.nickName.name);
    return (
        <div className={styles['nickname-container']}>
            <div className={styles.nickname}>
                {nickName}
            </div>
            <div className={styles.waitroom}>님의 대기실</div>
        </div>
    )
};

export default NickName;
