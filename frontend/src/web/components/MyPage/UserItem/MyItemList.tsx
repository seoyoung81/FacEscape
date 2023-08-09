import MyItem from './MyItem';
import { useState, useEffect } from 'react';
import styles from './UserItem.module.css';
import { authInstance } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const MyItemList: React.FC = () => {
    const [itemList, setItemList] = useState<any[]>([]);
    const [checkedItemId, setCheckedItemId] = useState<string | null>(null);
    const [myItem, setMyItem] = useState<boolean>(false);
    const navigate = useNavigate();
    const myCategory = useSelector((state: RootState ) => state.setMyItemType.itemType);

    const handleEquipItem = (itemId: string) => {
        setCheckedItemId(itemId);
    };

    const goMarket = () => {
        navigate('/market');
    }

    useEffect(() => {
    const fetchItemList = async () => {
        try {
            const { data } = await authInstance.get('/member/item/purchased', 
                {
                    params: {
                        itemType: myCategory,
                    }
                }
            ); 
            console.log('내가 구매한 아이템', data);
            if (data && data.items.length > 0) {
                setItemList(data.items);
                console.log('내가 구매한 아이템 불러오기 성공', data);
            } else {
                console.log('API 데이터가 0개임', data);
            }
        }  
        catch (error) {
            console.log('내가 구매한 아이템 불러오기 실패', error);
        }
    };

        fetchItemList();
    }, [myCategory]);
    
    return (
        <div className={styles['myitem-wrap']}>
            <div>
                {itemList.length === 0 ? (
                    <div className={styles['go-market']}>
                        <button onClick={goMarket}>아이템 구매하러 가기</button>
                    </div>
                    ) : (
                        null
                    )
                }
            </div>
            {itemList.map(item => (
                <MyItem
                    key={item.itemId}
                    itemId={item.itemId}
                    itemName={item.name}
                    itemImg={item.image}
                    checked={item.id === checkedItemId}
                    onEquip={handleEquipItem}
                />
            
      ))}
          
        </div>
    )
};

export default MyItemList;