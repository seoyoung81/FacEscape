import styles from './BeforeEnter.module.css';

const VideoCheck: React.FC = () => {
    return (
        <div>
            <div className={styles['video-check']}>
                <div className={styles.face}></div>
                <p className={styles.alert}>원 안에 얼굴에 맞춰주세요</p>
            </div>
        </div>
    )
}

export default VideoCheck;