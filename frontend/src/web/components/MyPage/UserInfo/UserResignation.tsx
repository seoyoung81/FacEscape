import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogIn } from '../../../store/authSlice';

import { authInstance } from '../../../services/api';

import styles from './UserInfo.module.css';
import Swal from 'sweetalert2';

const UserResignation: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const withdraw = async () => {
        try {
            await authInstance.delete('/member');
            localStorage.removeItem('token');
            dispatch(setIsLogIn(false));
            navigate('/');

        } catch (error: any) {
            console.log('회원탈퇴 실패', error);
            Swal.fire({
                title: '회원탈퇴 실패.',
    
                confirmButtonColor: '#3479AD',
                confirmButtonText: '확인',
            })
        }
    }
    
    const onResign = () => {
        // alert
        Swal.fire({
            title: '회원탈퇴를 하시겠습니까?',

            showCancelButton: true,
            confirmButtonColor: '#3479AD',
            cancelButtonColor: '#DB7500',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
              withdraw();
            } 
        })
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
