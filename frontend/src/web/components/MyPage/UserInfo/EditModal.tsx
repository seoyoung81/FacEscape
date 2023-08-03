import UserResignation from './UserResignation';
import styles from './UserInfo.module.css';

const EditModal: React.FC = () => {
  return (
    <div>
        <div className={styles['open-modal']}>
            <div className={styles['edit-input']}>
                <input type="text" defaultValue={'SoEZ'} />
                <button>수정</button>           
            </div>      
            <div className={styles['edit-input']}>
                <input type="text" defaultValue={'1234@ssafy.com'} />
                <button>수정</button>
            </div>
            <div className={styles['resign-container']}>
                <UserResignation />
            </div>
        </div> 
    </div>
  ) ;
};

export default EditModal;
