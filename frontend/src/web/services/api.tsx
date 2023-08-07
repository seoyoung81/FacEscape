import axios from 'axios';

const BASE_URL = 'http://i9a305.p.ssafy.io:8081';

interface AxiosOptions {
    [key: string]: any; 
  };

// 인증 값이 필요 없는 경우
const axiosApi = (url: string, options?: AxiosOptions) => {
    const instance = axios.create({ baseURL: url, ...options })
    return instance;
};

// 인증 값이 필요한 경우
const axiosAuthApi = (url: string, options?: AxiosOptions) => {
    const token = localStorage.getItem('token');
    const instance = axios.create({
      baseURL: url,
      headers: { Authorization: 'Bearer ' + token },
      ...options,
    })
    return instance;
  };
  
  export const defaultInstance = axiosApi(BASE_URL);
  export const authInstance = axiosAuthApi(BASE_URL);
