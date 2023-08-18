import MyItemImg from './MyItemImg';
import MyItemName from './MyItemName';
import { BsCheck } from 'react-icons/bs';
import { authInstance } from '../../../services/api';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleIconRender } from '../../../store/iconRenderSlice';

import styles from './UserItem.module.css';
import Swal from 'sweetalert2';

interface MyItemProps {
    itemId: string;
    itemName: string;
    itemImg: string;
    myCategory: string;
    itemRender: boolean;
    setItemRender: (value: boolean) => void;
}

const MyItem: React.FC<MyItemProps> = ({ itemId, itemName, itemImg, myCategory, itemRender, setItemRender }) => {
    const [usedYN, setUsedYN] = useState<boolean>();
    const [render, newRender] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onEquipItemClick = async () => {
        // 아이템 장착
        try {
            await authInstance.post('/member/equipment', 
                  { itemId }
            );
            
            // 아이템 장착되면 아이템 컴포넌트 api 다시 호출
              newRender(!render);
              setItemRender(!itemRender);
              dispatch(toggleIconRender());
              
          } catch (error) {
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
            }
        };
        fetchData();
    }, [myCategory, render, itemRender])
    
    return (
        <div className={styles['myitem-container']} >
            <div 
                onClick={onEquipItemClick}
            >
                <div >
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