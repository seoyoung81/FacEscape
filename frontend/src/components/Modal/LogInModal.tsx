import LogInForm from '../User/LoginForm';
import styles from './Modal.module.css';

interface LogInModalPageProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 모달창 컴포넌트
const LogInModal :React.FC<LogInModalPageProps> = ({ setModalOpen }) => {
    
    const closeModal = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void => {
        event?.stopPropagation();
        setModalOpen(false);

    }

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
                <p className={styles.title}>로그인</p>
                <div className={styles.modal}>
                    <LogInForm/>
                </div>
            </div>
        </div>
    )
}

export default LogInModal;