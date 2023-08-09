import styles from './User.module.css'


const GoogleLogin: React.FC = () => {
    const BASE_URL = 'http://i9a305.p.ssafy.io:8081';

    const googleLogin = () => {
        // 구글 로그인 코드
        window.location.href = `${BASE_URL}/login/oauth2`;
    };
    return (
        <div>
            <button 
                type='button'
                className={styles.google}
                onClick={googleLogin}
            >Google Login</button>
        </div>
    )
}

export default GoogleLogin;