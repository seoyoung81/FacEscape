import ItemCategory from './MyItemCategory';
import MyItemList from './MyItemList';
import styles from './UserItem.module.css';

const UserItem: React.FC = () => {
    return (
        <div>
            <div>
                <ItemCategory />
            </div>
            <div className={styles['user-item-container']}>
                <MyItemList />
            </div>
        </div>
    )
};

export default UserItem;