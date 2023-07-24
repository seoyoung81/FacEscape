import styles from './Modal.module.css';

interface LogInModalPageProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 모달창 컴포넌트
const LogInModal :React.FC<LogInModalPageProps> = ({ setModalOpen }) => {
    
    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        setModalOpen(false);

    }

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <p className={styles.title}>로그인</p>
        </div>
    )
}

export default LogInModal;