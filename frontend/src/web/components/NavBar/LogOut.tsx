import styles from './NavBar.module.css';
import { useState } from 'react';

const LogOut: React.FC = () => {
    const logOut = () => {
        // 로그아웃 로직
    }

    return (
        <div
            className={styles['login']}
            onClick={logOut}
            style={{ width: '150px'}}
        >
            로그아웃
        </div>
    )
}

export default LogOut;