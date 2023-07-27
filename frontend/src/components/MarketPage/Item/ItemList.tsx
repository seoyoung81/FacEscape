import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Item from './Item';
import styles from './Item.module.css';

// 카테고리
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

    // 필요한 것
    // 카테고리
    const itemType = useSelector((state: RootState) => state.setItemType);
    // 페이지
    // 페이지 사이즈
    // 키워드
    
    console.log('지금 눌린 카테고리는', itemType);
    
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users", {
            params: {
               // page: page,
               // size: pageSize,
               itemType: itemType,
               // keyword: keyword
            }
        })
            .then((response: AxiosResponse<ApiResponse[]>) => {
                const allItems = response.data.flatMap((data) => data.items);
                setItemData(allItems);
            })
            .catch((error) => console.error('에러났음', error))
    }, [itemType]);

  return (
    <div className={styles.container}>
        {itemData && itemData.length > 0 ? (
            itemData.map((item) => (
                <div key={item.ItemId} className={styles['main-item']}>
                    <Item 
                        itemName={item.name} 
                        itemImg={item.image} 
                        itemPrice={item.price} 
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
