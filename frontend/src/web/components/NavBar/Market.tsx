import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


const Market = () => {
    return (
        <div>
            <Link to="/market">
                <HiMiniBuildingStorefront 
                    size="59" 
                    className={styles.market}
                /> 
            </Link>
        </div>
    )
}

export default Market;