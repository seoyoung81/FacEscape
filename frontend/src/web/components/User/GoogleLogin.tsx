import { useEffect } from 'react';
import styles from './User.module.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../../api/instance';

const GoogleLogin: React.FC = () => {

    const googleLogin = async () => {
        // 구글 로그인 코드
        window.location.href = "https://i9a305.p.ssafy.io/api/backend/login/oauth2"
    }
    

   

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