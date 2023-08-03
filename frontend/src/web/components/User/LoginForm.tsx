import { useForm, Controller } from 'react-hook-form';
import GoogleLogin from './GoogleLogin';
import styles from './User.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { initToken } from '../../services/Token/Token';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';

type FormData = {
  email: string;
  password: string; 
};

const LogInForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
//   const dispatch = useDispatch();
//   const isLogin = useSelector((state: RootState) => state.setIsLogIn.isLogIn);
//   // 회원 정보 잘 가져왔나 그냥 확인하는 용도
//   const [nickname, setNickname] = useState<string>('');

    // useEffect(() => {
    //     initToken(dispatch);
    // }, [dispatch]);

  const onSubmit = (data: FormData) => {
    console.log(data);

    axios.post('http://localhost:8080/login', data)
        .then((response) => {
            console.log('로그인 성공', response);
        })
        .catch(error => {
            console.log('로그인 실패', error);
            console.log('실패 코드', error.config)
        })

    // try {
    //     const response = await axios.post('http://localhost:8080/login', data);
    //     console.log('로그인 성공', response);
    //     console.log('로그인 한 사람 이름', response.data.nickname);
    //     setNickname(response.data.nickname);

    // } catch (error) {
    //     console.error('Login failed', error);
    // }
  }; 

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                name="email"
                control={control}
                rules={{ 
                    required: '아이디를 입력해주세요.',
                    pattern: {
                        value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: '정확한 이메일 주소를 입력하세요'
                    }
                    }}
                render={({ field }) => 
                        <input 
                            {...field} 
                            type="text" 
                            placeholder='이메일'
                            className={styles.logininput}
                            defaultValue={""}
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
                rules={{ required: '비밀번호를 입력해주세요.' }}
                render={({ field }) => 
                    <input 
                        {...field} 
                        type="password" 
                        placeholder='비밀번호'
                        className={styles.logininput}
                        defaultValue={""}
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
