import Item from './Item';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../../services/market';

import { defaultInstance } from '../../../services/api';

import styles from './Item.module.css';

export interface ItemType {
    ItemId: number;
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

    console.log(itemType);

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
            console.log('아이템 조회', response);
            const allItems = response.data.flatMap((data: any) => data.items);
            setItemData(allItems);
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
                    <div key={item.ItemId} className={styles['main-item']}>
                        <Item 
                            itemName={item.name} 
                            itemImg={item.image} 
                            itemPrice={item.price} 
                            itemId={item.ItemId}
                        />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ItemList;
