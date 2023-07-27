import styles from './SearchItem.module.css';
import { BiSearchAlt } from "react-icons/bi";

const SearchItem: React.FC = () => {
    return (
        <div className={styles['search-container']}>
            <BiSearchAlt className={styles['search-icon']} />
            <input 
                type="text"
                placeholder='검색창'
                className={styles['search-input']} 
            />

        </div>
    )
}

export default SearchItem;