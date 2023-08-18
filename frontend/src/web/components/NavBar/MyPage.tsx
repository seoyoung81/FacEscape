import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

const MyPage: React.FC = () => {
    const navigate = useNavigate();

    const goToMyPage = () => {
        navigate('/mypage');
    };
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
