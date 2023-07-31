import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Item from './Item';
import styles from './Item.module.css';

// 카테고리 & 검색
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


export interface ItemType {
    ItemId: number;
    name: string;
    image: string;
    price: number;
    items: ItemType[]
}
 
export interface ApiResponse {
    items: ItemType[];
    currentPage: number;
    totalPages: number;
    isLastPage: boolean;
}


const ItemList: React.FC = () => {
    const [itemData, setItemData] = useState<ItemType[] | null>(null);

    // 카테고리
    const itemType = useSelector((state: RootState) => state.setItemType);

    // 키워드
    const keyword = useSelector((state: RootState) => state.setKeyword);
    
    
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users", {
            params: {
               itemType: itemType,
               keyword: keyword,
            }
        })
            .then((response: AxiosResponse<ApiResponse[]>) => {
                const allItems = response.data.flatMap((data) => data.items);
                setItemData(allItems);
            })
            .catch((error) => console.error('에러났음', error))
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
