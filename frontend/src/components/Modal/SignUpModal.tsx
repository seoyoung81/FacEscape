import styles from './Modal.module.css';

interface SignUpModalPageProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 모달창 컴포넌트
const SignUpModal :React.FC<SignUpModalPageProps> = ({ setModalOpen }) => {
    
    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        setModalOpen(false);

    }

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <p className={styles.title}>회원 가입</p>
        </div>
    )
}

export default SignUpModal;