import MyItem from './MyItem';
import { useState, useEffect } from 'react';
import styles from './UserItem.module.css';
import { authInstance } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const MyItemList: React.FC = () => {
    const [itemList, setItemList] = useState<any[]>([]);
    const [clickedItemId, setClickedItemId] = useState<string | null>(null);
    const navigate = useNavigate();
    const myCategory = useSelector((state: RootState ) => state.setMyItemType.itemType);
    
    // 상점으로 이동하기
    const goMarket = () => {
        navigate('/market');
    }

    // 내가 구매한 아이템 카테고리별로 불러오기
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
                
                if (data && data.items.length >= 0) {
                    setItemList(data.items);
                } 
            }  
            catch (error) {
                console.log('내가 구매한 아이템 불러오기 실패', error);
            }
        };

        fetchItemList();
    }, [myCategory, clickedItemId]);

    
    return (
        <div>

        <div className={styles['myitem-wrap']}>
            
            {itemList ? (
                itemList.map(item => (
                    <MyItem
                        key={item.itemId}
                        itemId={item.itemId}
                        itemName={item.name}
                        itemImg={item.image}
                        myCategory={myCategory}
                    />
                
                ))
            ) : (
              
                <div className={styles['go-market']}>
                    <button onClick={goMarket}>아이템 구매하러 가기</button>
                </div>
                    
               
            )}
          
        </div>
        </div>
    )
};

export default MyItemList;