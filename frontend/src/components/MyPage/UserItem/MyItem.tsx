import MyItemImg from './MyItemImg';
import MyItemName from './MyItemName';

import styles from './UserItem.module.css';

const MyItem: React.FC = () => {
    return (
        <div>
            <div className={styles['myitem-container']}>
                <div>
                    <MyItemImg />
                </div>
                <MyItemName />
            </div>
        </div>
    )
};

export default MyItem;