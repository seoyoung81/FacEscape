import MyItem from './MyItem';
import { useState, useEffect } from 'react';
import styles from './UserItem.module.css';
import { authInstance } from '../../../services/api';

const MyItemList: React.FC = () => {
    const [itemList, setItemList] = useState<any[]>([]);
    const [checkedItemId, setCheckedItemId] = useState<string | null>(null);

    const handleEquipItem = (itemId: string) => {
        setCheckedItemId(itemId);
    };

    // const itemList = [
    //     { id: 'item1', name: 'Item 1' },
    //     { id: 'item2', name: 'Item 2' },
    //     { id: 'item3', name: 'Item 3' },
    //     { id: 'item4', name: 'Item 4' },
    //     { id: 'item5', name: 'Item 5' },
    //     { id: 'item6', name: 'Item 6' },
    //     { id: 'item7', name: 'Item 7' },
    
    //   ];

   
    useEffect(() => {
    const fetchItemList = async () => {
        try {
            const { data } = await authInstance('/member/item/purchased'); 
            setItemList(data);
            console.log('내가 구매한 아이템 불러오기 성공', data);
            return data;
        }  
        catch (error) {
            console.log('내가 구매한 아이템 불러오기 실패', error);
        }
    };

    fetchItemList();
    }, []);
    

    return (
        <div className={styles['myitem-wrap']}>
            {itemList.map(item => (
            <MyItem
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                checked={item.id === checkedItemId}
                onEquip={handleEquipItem}
            />
      ))}
          
        </div>
    )
};

export default MyItemList;