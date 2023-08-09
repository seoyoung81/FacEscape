import { useEffect } from 'react';
import styles from './User.module.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../../services/api';

const GoogleLogin: React.FC = () => {

    const googleLogin = async () => {
        // 구글 로그인 코드
        
        const Google_URL = "https://accounts.google.com/o/oauth2/v2/auth";
        const queries = {
          response_type : "code",
          client_id: "249028033375-3q56vn82p2jku86es16u191kflqp6p1o.apps.googleusercontent.com",
          redirect_uri: "http://localhost:3000/login/loading",
          scope : "email"
        };
      
        const params = new URLSearchParams(queries).toString();
        // localStorage.setItem("web", "google")
        window.location.href = `${Google_URL}?${params}`
        
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