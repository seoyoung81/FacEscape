import styles from './Item.module.css';

interface imgProps {
    itemImg: string;
    itemName: string;
}

const ItemImg :React.FC<imgProps> = ({ itemImg, itemName }) => {
    const img: string = itemImg ;
    return (
        <div>
            <div className={styles['img-box']}>
                <img 
                    src={`${img}`} 
                    alt={itemImg}
                    className={styles['item-img']}
                />
                <div className={styles['success-text']}>
                    {itemName}
                </div>
            </div>
        </div>
    )
}
export default ItemImg;