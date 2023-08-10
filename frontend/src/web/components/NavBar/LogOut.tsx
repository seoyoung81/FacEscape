import { useDispatch } from 'react-redux';
import { setIsLogIn } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import styles from './NavBar.module.css';
import Swal from 'sweetalert2';

const LogOut: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogIn = useSelector((state: RootState) => state.setIsLogIn);

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

    // 토큰 만료 시 로그아웃 시키기
    if (isLogIn && !sessionStorage.getItem('accessToken')) {
        // alert('토큰 만료 로그인 다시 고');
        dispatch(setIsLogIn(false));
        navigate('/');
    }


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