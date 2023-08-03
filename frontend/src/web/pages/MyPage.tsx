import UserInfo from "../components/MyPage/UserInfo/UserInfo";
import UserItem from "../components/MyPage/UserItem/UserItem";
import NavBar from "../components/NavBar/NavBar";
import styles from './MyPage.module.css';

const MyPage = () => {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={styles['mypage-container']}>
                <div>
                    <UserInfo />
                </div>
                <div>
                    <UserItem />
                </div>
            </div>
        </div>
    )
}

export default MyPage;