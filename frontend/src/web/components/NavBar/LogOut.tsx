import { useDispatch } from 'react-redux';
import { setIsLogIn } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

import styles from './NavBar.module.css';
import Swal from 'sweetalert2';

const LogOut: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',

            showCancelButton: true,
            confirmButtonColor: '#3479AD',
            cancelButtonColor: '#DB7500',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                // 로그아웃 로직
                sessionStorage.removeItem('accessToken');
                dispatch(setIsLogIn(false));
                navigate('/');

            } 
        })
    };
 
    return (
        <div
            className={styles['login']}
            onClick={logOut}
            style={{ width: '150px'}}
        >
            로그아웃
        </div>
    )
}

export default LogOut;