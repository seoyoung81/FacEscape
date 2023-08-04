import { Link } from 'react-router-dom';
import React from 'react';
import styles from './NavBar.module.css';


const Logo :React.FC = () => {
    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p className={styles['logo-img']}>
                    <span>F</span>ac<span>E</span>scape
                </p>
            </Link>
            
        </div>
    )
}

export default Logo;