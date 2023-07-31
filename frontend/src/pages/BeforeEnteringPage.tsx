import styles from './BeforeEnteringPage.module.css';
import VideoCheck from '../components/BeforeEnterPage/VideoCheck';
import InputNickname from '../components/BeforeEnterPage/InputNickname';


const BeforeEnteringPage: React.FC = () => {
    return (
        <div>
            <div className={styles.phrases}>입장 전 테스트</div>
            <VideoCheck />
            <InputNickname />
        </div>
    )
}

export default BeforeEnteringPage;