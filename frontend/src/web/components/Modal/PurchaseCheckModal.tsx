import styles from './Modal.module.css';
import { authInstance } from '../../services/api';

interface purchaseProps {
    itemPrice: number;
    itemId: number;
    itemImg: string;
    itemName: string;
    setOpenPurchaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseCheckModal: React.FC<purchaseProps> = ({ itemPrice, itemId, itemImg, itemName, setOpenPurchaseModal }) => {
    const closeModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        event?.stopPropagation();
        setOpenPurchaseModal(false);
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    console.log(itemId);
    const purchaseItem = async () => {
        const response = await authInstance.post('/member/item', {
            itemId
        })
        try {
            console.log('구매 동작 성공', response);
        }
        catch(error) {
            // 이미 구매한 아이템이면 구매 못하게
    
            // 가격이 내 마일리지보다 높으면 구매 못하게
            console.log('구매 동작 실패', error);
        }
        setOpenPurchaseModal(false);
    };

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} style={{ width: '402px', height: '350px' }} onClick={stopPropagation}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                <p className={styles['item-name']}>{itemName}</p>
                <img 
                    src={`${itemImg}`} 
                    alt="wing" 
                    className={styles['item-img']}
                />
                <p className={styles['item-price']}>{itemPrice}</p>
                <div className={styles['btn-container']}>
                    <button 
                        className={styles['purchase-btn']}
                        onClick={purchaseItem}
                    >
                        구입하기
                    </button>
                    <button 
                        className={styles['cancel-btn']}
                        onClick={closeModal}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseCheckModal;