import styles from './UserInfo.module.css';
import { useState } from 'react';
import EditModal from './EditModal';

const EditInfo: React.FC= () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const onEditModal = () => {
        setOpenEditModal(!openEditModal);
    };
  return (
    <div>
        <div 
            className={styles['edit-user']}
            onClick={onEditModal}
        >
            회원정보수정
        </div>
        <div className={styles['edit-modal']}>
            {openEditModal ? <EditModal /> : null }
        </div>
    </div>
  );
};

export default EditInfo;
