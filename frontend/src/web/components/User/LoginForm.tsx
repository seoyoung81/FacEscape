import GoogleLogin from './GoogleLogin';

import { useForm, Controller } from 'react-hook-form';

import { defaultInstance } from '../../services/api';

import { useDispatch } from 'react-redux';
import { setIsLogIn } from '../../store/authSlice';
import axios from 'axios';

import styles from './User.module.css';
import Swal from 'sweetalert2';

type FormData = {
  email: string;
  password: string; 
};

interface closeModalProps {
    closeModal: (event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const LogInForm: React.FC<closeModalProps> = ({ closeModal }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();  
  const dispatch = useDispatch();                                                                                   

  const onSubmit = async (LogIndata: FormData) => {
    try {
        const { data } = await defaultInstance.post(
            '/login',
            LogIndata
        )
        // 토큰 저장
        sessionStorage.setItem('accessToken', `${data.accessToken}`)
        // 로그인 상태
        dispatch(setIsLogIn(true));
        // 모달창 닫기
        closeModal();
        window.location.reload();
        return data;
    } catch (error: any) {
        console.log('로그인 실패', error);
        // 로그인 실패 alert
        Swal.fire({
            title: '존재하지 않는 정보입니다.',

            confirmButtonColor: '#3479AD',
            confirmButtonText: '확인',
        })

    }
  }; 
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ 
                    required: '아이디를 입력해주세요.',
                    pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: '정확한 이메일 주소를 입력하세요'
                    }
                    }}
                render={({ field }) => 
                        <input 
                            {...field} 
                            type="text" 
                            placeholder='이메일'
                            className={styles.logininput}
                        />  
                }
                />
                {errors.email ? ( 
                    <p className={styles.error}>{errors.email.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }
                
                <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: '비밀번호를 입력해주세요.' }}
                render={({ field }) => 
                    <input 
                        {...field} 
                        type="password" 
                        placeholder='비밀번호'
                        className={styles.logininput}
                    />}
                />
                {errors.password ? ( 
                    <p className={styles.error}>{errors.password.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }
        
                <button 
                    type="submit"
                    className={styles.submit}
                    >
                        로그인
                </button>
            <GoogleLogin />            
        </form>
   
    </div>
  );
};

export default LogInForm;
