import styles from './Item.module.css';

interface priceProps {
    itemPrice: number;
}

const ItemPurchase :React.FC<priceProps> = ({ itemPrice }) => {
    return (
        <div>
            <div className={styles['price-back']}>
                <div className={styles.mileage}>M</div>
                <button className={styles['item-price']}>{itemPrice}</button>
            </div>
           
        </div>
    )
};

export default ItemPurchase;