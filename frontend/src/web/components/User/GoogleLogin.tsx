import { useEffect } from 'react';
import styles from './User.module.css'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../../services/api';

const GoogleLogin: React.FC = () => {
    const BASE_URL = 'http://i9a305.p.ssafy.io:8081';
    const navigate = useNavigate();

    const googleLogin = async () => {
        // 구글 로그인 코드
        // window.location.href = `${BASE_URL}/login/oauth2`;
        // try {
        //     window.location.href = `${BASE_URL}/login/oauth2`;
        //     console.log('구글 로그인 성공');
        //     console.log(window.JSON);
        //     let params = new URL(document.URL).searchParams;
        //     let code = params.get("code");
        //     console.log(code);
        
        //     if (code) {
        //         console.log('Code from URL:', code);
        //     }
        // } catch (error) {
        //     console.log('구글 로그인 에러', error);
        // }
        const Google_URL = "https://accounts.google.com/o/oauth2/v2/auth";
        const queries = {
          response_type : "code",
          client_id: "249028033375-3q56vn82p2jku86es16u191kflqp6p1o.apps.googleusercontent.com",
          redirect_uri: "http://localhost:3000/login/loading",
          scope : "email"
        };
      
        const params = new URLSearchParams(queries).toString();
      
        localStorage.setItem("web", "google")
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