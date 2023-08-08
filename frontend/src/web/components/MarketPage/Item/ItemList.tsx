import Item from './Item';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { defaultInstance } from '../../../services/api';

import styles from './Item.module.css';

export interface ItemType {
    itemId: number;
    name: string;
    image: string;
    price: number;
    items: ItemType[]
}
 
const ItemList: React.FC = () => {
    const [itemData, setItemData] = useState<ItemType[] | null>([]);

    // 카테고리
    const itemType = useSelector((state: RootState) => state.setItemType);
    // 검색
    const keyword = useSelector((state: RootState) => state.setKeyword);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await defaultInstance.get(
            `/items`,
            {
                params: {
                    itemType: itemType.itemType,
                    keyword: keyword.keyword
                },
            }
            );
            setItemData(response.data.items || []);
        } catch (error) {
            console.error('아이템 조회 에러났음', error);
        }
        };
        fetchData();
    }, [itemType, keyword]);

    return (
        <div className={styles.container}>
            {itemData && itemData.length > 0 ? (
                itemData.map((item) => (
                    <div key={item.itemId} className={styles['main-item']}>
                        <Item 
                            itemName={item.name} 
                            itemImg={item.image} 
                            itemPrice={item.price} 
                            itemId={item.itemId}
                        />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
                // 무조건 UI 넣을 것.
            )}
        </div>
    );
};

export default ItemList;
