import MyItemImg from './MyItemImg';
import MyItemName from './MyItemName';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

import styles from './UserItem.module.css';

const MyItem: React.FC = () => {
    const [check, setCheck] = useState<boolean>(false);
    const onEquip = () => { 
        setCheck(!check);
    };
    // check 가 true 이면 아이템 장착하는 API 요청 보내기
    if (check) {
        // 아이템 장착 로직
    }
    return (
        <div>
            <div 
                className={styles['myitem-container']}
                onClick={onEquip}
            >
                <div>
                    <MyItemImg />
                </div>
                <MyItemName />
            <div className={styles['check-icon']}>
                {check ? <BsCheck size={180} /> : null}
            </div>
            </div>
        </div>
    )
};

export default MyItem;