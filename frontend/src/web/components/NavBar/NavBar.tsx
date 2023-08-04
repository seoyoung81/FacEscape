// components
import Logo from "./Logo";
import Ranking from "./Ranking";
import Market from "./Market";
import SignUp from "./SignUp";
import LogIn from "./LogIn"; 
import LogOut from "./LogOut";
import MyPage from "./MyPage";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// css
import styles from './NavBar.module.css';


const NavBar = () => {
    const isLogIn = useSelector((state: RootState) => state.setIsLogIn.isLogIn);
    return (
        <>
        <div className={styles['nav-bar']}>
            <div className={styles['nav-bar-left']}>
                <Logo />   
                <Ranking />  
                <Market />
            </div>
            <div className={styles['nav-bar-right']}>
                {isLogIn ? <MyPage /> : <SignUp />}
                {isLogIn ? <LogOut /> : <LogIn />}
            </div>
        </div>
            
        </>
        
    )
}

export default NavBar;