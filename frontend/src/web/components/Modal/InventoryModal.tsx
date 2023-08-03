import styles from './Modal.module.css';
import UserItem from '../MyPage/UserItem/UserItem';

interface InventoryModalPageProps {
    setInventroy: React.Dispatch<React.SetStateAction<boolean>>;
}
// 모달창 컴포넌트
const InventoryModal :React.FC<InventoryModalPageProps> = ({ setInventroy }) => {
    
    const closeModal = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
        event?.stopPropagation();
        setInventroy(false);

    }

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }


    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} onClick={stopPropagation} style={{ width: '1054px', height: '700px', background: 'rgba(217, 217, 217, 0.85)', border: 'none' }}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                <div className={styles.modal}>
                    <div className={styles['inventory-title']} >INVENTORY</div>
                    <div className={styles['inventory-item']}>
                        <UserItem />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InventoryModal;