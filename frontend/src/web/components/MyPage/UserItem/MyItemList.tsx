import MyItem from './MyItem';
import styles from './UserItem.module.css';

const MyItemList: React.FC = () => {
    return (
        <div className={styles['myitem-wrap']}>
            <MyItem />
            <MyItem />
            <MyItem />
            <MyItem />
            <MyItem />
            <MyItem />
            <MyItem />
        </div>
    )
};

export default MyItemList;