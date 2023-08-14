import MyItemImg from './MyItemImg';
import MyItemName from './MyItemName';
import { BsCheck } from 'react-icons/bs';
import { authInstance } from '../../../services/api';
import { useState, useEffect } from 'react';

import styles from './UserItem.module.css';
import Swal from 'sweetalert2';

interface MyItemProps {
    itemId: string;
    itemName: string;
    itemImg: string;
    myCategory: string;
}

const MyItem: React.FC<MyItemProps> = ({ itemId, itemName, itemImg, myCategory }) => {
    const [usedYN, setUsedYN] = useState<boolean>();
    const [render, newRender] = useState<boolean>(false);
   
    const onEquipItemClick = async () => {
        // 아이템 장착
        try {
            await authInstance.post('/member/equipment', 
                  { itemId }
            );
            
            // 아이템 장착되면 아이템 컴포넌트 api 다시 호출
              newRender(!render);
              
          } catch (error) {
              console.log('아이템 장착 실패', error);
          }
    
        };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await authInstance.get('/member/item/purchased', 
                    {
                        params: {
                            itemType: myCategory,
                        }
                    }
                ); 
                const selectedItem = data.items.find((item: any) => item.itemId === itemId);
                if (selectedItem) {
                    setUsedYN(selectedItem.usedYN);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [myCategory, render])
    
    return (
        <div>
            <div 
                className={styles['myitem-container']}
                onClick={onEquipItemClick}
            >
                <div>
                    <MyItemImg itemImg={itemImg} />
                </div>
                <MyItemName itemName={itemName} />
            <div className={styles['check-icon']}>
                {usedYN ? <BsCheck size={180} /> : null}
            </div>
            </div>
        </div>
    )
};

export default MyItem;