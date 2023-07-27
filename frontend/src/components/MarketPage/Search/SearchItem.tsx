import styles from './SearchItem.module.css';
import { BiSearchAlt } from "react-icons/bi";

const SearchItem: React.FC = () => {
    return (
        <div className={styles['search-container']}>
            <input 
                type="text"
                placeholder='검색창'
                className={styles['search-input']} 
            />
            <BiSearchAlt className={styles['search-icon']} />

        </div>
    )
}

export default SearchItem;