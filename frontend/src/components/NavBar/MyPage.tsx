import styles from './NavBar.module.css';
const MyPage = () => {
    const goToMyPage = () => {
        // MyPage로
    }
    return (
        <div
            className={styles['sign-up']}
            onClick={goToMyPage}
        >
            마이페이지
        </div>
    )
}

export default MyPage;
