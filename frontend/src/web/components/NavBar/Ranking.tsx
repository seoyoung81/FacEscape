import { FaRankingStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

const Ranking: React.FC = () => {
    return (
        <div>
            <Link to="/rank">
                <FaRankingStar 
                    size="59" 
                    className={styles.ranking}
                />
            </Link>
        </div>
    )
}

export default Ranking;