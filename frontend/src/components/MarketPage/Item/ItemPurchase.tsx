import styles from './Item.module.css';

const ItemPurchase :React.FC = () => {
    return (
        <div>
            <div className={styles['mileage-container']}>
                <div className={styles.mileage}>M</div>
                <button className={styles['item-price']}>100</button>
                <div className={styles['price-back']}></div>
            </div>
        </div>
    )
};

export default ItemPurchase;