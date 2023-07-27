import styles from './Category.module.css';

interface itemType {
    itemType: string;
}

const ItemType: React.FC<itemType> = ({ itemType }) => {
    return (
        <div className={styles['item-name']}>{ itemType }</div>
    )
}

export default ItemType;