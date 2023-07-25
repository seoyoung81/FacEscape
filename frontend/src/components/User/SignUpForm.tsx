import { useForm, Controller } from 'react-hook-form';
import styles from './User.module.css';

type FormData = {
    email: string;
    password: string;
    nickname: string;

}

const SignUpForm: React.FC = () => {
    const { control, handleSubmit, formState: { errors }} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
      }; 

    return (
        <div>
            <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>닉네임</label>
                    <Controller
                        name="nickname"
                        control={control}
                        rules={{ 
                            required: '아이디를 입력해주세요.',
                            
                            }}
                        render={({ field }) => 
                                
                                <input 
                                    {...field} 
                                    type="text" 
                                    className={styles.logininput}
                                />  
                        }
                    />
                    {errors?.nickname && <p className={styles.error}>{errors.nickname.message}</p>}
                </div>
                <div>
                    <label>이메일</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: '비밀번호를 입력해주세요.' }}
                        render={({ field }) => 
                            <input 
                                {...field} 
                                type="email" 
                                className={styles.logininput}
                            />}
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div>
                    <label>비밀번호</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: '비밀번호를 입력해주세요.' }}
                        render={({ field }) => 
                            <input 
                                {...field} 
                                type="password" 
                                className={styles.logininput}
                            />}
                        />
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: '비밀번호를 입력해주세요.' }}
                        render={({ field }) => 
                            <input 
                                {...field} 
                                type="password" 
                                className={styles.logininput}
                            />}
                        />
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                    <button 
                        type="submit"
                        className={styles.submit}
                        >
                            회원가입
                    </button>
            </form>  
            </div>
        </div>
    )

}

export default SignUpForm;