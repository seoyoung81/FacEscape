import styles from './Modal.module.css';
import { authInstance } from '../../services/api';
import { useDispatch } from 'react-redux';
import { toggleMileageRender } from '../../store/mileageRender';
import Swal from 'sweetalert2';

interface purchaseProps {
    itemPrice: number;
    itemId: number;
    itemImg: string;
    itemName: string;
    setOpenPurchaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseCheckModal: React.FC<purchaseProps> = ({ itemPrice, itemId, itemImg, itemName, setOpenPurchaseModal }) => {
    const dispatch = useDispatch();
    const closeModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        event?.stopPropagation();
        setOpenPurchaseModal(false);
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    const purchaseItem = async () => {
        try {
            const response = await authInstance.post('/member/item', {
                itemId
            })
            Swal.fire({
                title: `${itemName} 구매 성공!`,
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
              }).then(() => {
                dispatch(toggleMileageRender());
              });
        }
        catch(error: any) {
            if (error.response.data && error.response.data.errors[0].field === 'mileage') {
                Swal.fire({
                    title: '보유 마일리지가 부족합니다.',
                    confirmButtonColor: '#3479AD',
                    confirmButtonText: '확인',
                });
            } else if (error.response && error.response.status === 400) {
                Swal.fire({
                    title: '이미 보유한 아이템입니다.',
                    confirmButtonColor: '#3479AD',
                    confirmButtonText: '확인',
                    });
                } 
            };
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