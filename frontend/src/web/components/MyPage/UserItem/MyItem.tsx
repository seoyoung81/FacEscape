import MyItemImg from './MyItemImg';
import MyItemName from './MyItemName';
import { BsCheck } from 'react-icons/bs';

import styles from './UserItem.module.css';

interface MyItemProps {
    itemId: string;
    itemName: string;
    checked: boolean;
    onEquip: (itemId: string) => void;
}

const MyItem: React.FC<MyItemProps> = ({ itemId, itemName, checked, onEquip }) => {
    const onEquipItemClick = () => {
        if (checked) {
            onEquip(""); 
          } else {
            onEquip(itemId);
          }
      };

    return (
        <div>
            <div 
                className={styles['myitem-container']}
                onClick={onEquipItemClick}
            >
                <div>
                    <MyItemImg />
                </div>
                <MyItemName />
            <div className={styles['check-icon']}>
                {checked ? <BsCheck size={180} /> : null}
            </div>
            </div>
        </div>
    )
};

export default MyItem;