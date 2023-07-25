import { useForm, Controller } from 'react-hook-form';
import GoogleLogin from './GoogleLogin';
import styles from './User.module.css';

type FormData = {
  email: string;
  password: string; 
};

const LogInForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
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
