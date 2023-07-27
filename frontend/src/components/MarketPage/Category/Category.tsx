import styles from './Category.module.css';
import ItemType from './ItemType';
import SelectedItem from './SelectedItem';

const Category: React.FC = () => {
    
    return (
        <div className={styles['category-container']}>
            <div>
                <div className={styles['category-component']}>
                    <SelectedItem />
                    <ItemType itemType="말풍선"/>
                </div>
                <div className={styles['category-component']}>
                    <SelectedItem />
                    <ItemType itemType="아이콘"/>
                </div>
                <div className={styles['category-component']}>
                    <SelectedItem />
                    <ItemType itemType="화면효과"/>
                </div>
                <div className={styles['category-component']}>
                    <SelectedItem />
                    <ItemType itemType="음성효과"/>
                </div>
            </div>
           
        </div>
    )
}

export default Category;