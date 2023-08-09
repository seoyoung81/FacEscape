import styles from './UserInfo.module.css';

const UserResignation: React.FC = () => {
    // 회원 탈퇴 모달이 필요한가
    const onResign = () => {
        // 회원 탈퇴 로직
    };
  return (
    <div>
        <div 
            className={styles['resign-message']}
            onClick={onResign}
        >
            회원탈퇴
        </div>
    </div>
  ) ;
};

export default UserResignation;
