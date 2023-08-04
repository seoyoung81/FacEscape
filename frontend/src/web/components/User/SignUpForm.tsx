import { useForm, Controller } from 'react-hook-form';

// api
import { defaultInstance } from '../../services/api';

// css
import styles from './User.module.css';
import Swal from 'sweetalert2';

type FormData = {
    email: string;
    password: string;
    nickname: string;
    confirmPassword: string;
}

interface closeModalProps {
    closeModal: (event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}


const SignUpForm: React.FC<closeModalProps> = ({ closeModal }) => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    
    // 비밀번호 추적
    const watchPassword :string = watch('password', '');

    const onSubmit = async (data: FormData) => {
        const { confirmPassword, ...dataWithoutConfirmPassword } = data;

        // 이메일 중복 확인
        try {
            const { data } = await defaultInstance.get(
                `/check-email?email=${dataWithoutConfirmPassword.email}`
            )
            if (data.uniqueEmail === true) {

                    // 회원가입 로직
                    try {
                        const { data } = await defaultInstance.post(
                            '/member',
                            dataWithoutConfirmPassword
                        )

                        // 회원가입 성공 alert
                        Swal.fire({
                            title: '회원가입 성공!',

                            confirmButtonColor: '#3479AD',
                            confirmButtonText: '확인',
                        }).then(result => {
                            if (result.isConfirmed) {
                                // 모달창 닫기
                                closeModal();
                            }
                        })

                        return data;
                    } catch (error: any) {
                        if (error.response?.status === 400) {
                            if (error.response.data.errors[0]?.errorMessage === '이미 회원가입된 회원입니다.') {
                                Swal.fire('이미 가입한 회원입니다', '', 'error')
                            }
                        } else (
                            console.log('회원 가입 실패', error)
                        )
                    }
            } else (
                Swal.fire('이미 가입한 회원입니다', '', 'error')
            )
            } catch (error: any) {
                console.log('이메일 중복체크 실패', error);
            }
    }

    return (
        <div className={styles.container}>
                <div className={styles.labels}>
                    <p className={styles.label}>닉네임</p>
                    <p className={styles.label}>이메일</p>
                    <p className={styles.label}>비밀번호</p>
                    <p className={styles.label}>비밀번호<br/>확인</p>
                </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="nickname"
                    control={control}
                    defaultValue=""
                    rules={{ 
                        required: '닉네임을 입력해주세요.',
                        pattern: {
                            value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/,
                            message: '닉네임에는 특수문자를 포함할 수 없습니다.'
                        },
                        maxLength: {
                            value: 8,
                            message: '1자 이상, 8자 이하의 닉네임을 입력해주세요.'
                          },
                        minLength: {
                            value: 1,
                            message: '1자 이상, 8자 이하의 닉네임을 입력해주세요.',
                        }
                        }}
                    render={({ field }) => 
                            <input 
                                {...field} 
                                type="text" 
                                className={styles.logininput}
                            />  
                    }
                />
                {errors.nickname ? ( 
                    <p className={styles.error}>{errors.nickname.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ 
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                
                            message: '정확한 이메일 주소를 입력하세요.'
                        },
                        maxLength: {
                            value: 320,
                            message: '이메일 글자수를 확인해주세요.'
                          },
                        minLength: {
                            value: 8,
                            message: '이메일 글자수를 확인해주세요.',
                        }
                    }}
                    // 회원가입된 유저인지 확인 여부 code ...
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="text" 
                            className={styles.logininput}
                        />}
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
                    rules={{ 
                        required: '비밀번호를 입력해주세요.',
                        minLength: {
                            value: 8,
                            message: '비밀번호는 8자 이상 입력해주세요.',
                        }
                    }}
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="password" 
                            className={styles.logininput}
                        />}
                    />
                {errors.password ? ( 
                    <p className={styles.error}>{errors.password.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }                  
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{ 
                        required: '비밀번호를 입력해주세요.',
                        validate: (value) => (
                            value === watchPassword || '비밀번호가 일치하지 않습니다.'
                        )
                    }}
                    render={({ field }) => 
                        <input 
                            {...field} 
                            type="password" 
                            className={styles.logininput}
                        />}
                    />
                {errors.confirmPassword ? ( 
                    <p className={styles.error}>{errors.confirmPassword.message}</p>) : (
                        <p className={styles.error}>&nbsp;</p>
                    )
                }                   
                    <button 
                        type="submit"
                        className={styles.submit}
                        >
                            회원가입
                    </button>
            </form>  
        </div>
 
    )

};

export default SignUpForm;