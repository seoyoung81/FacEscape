import axios from 'axios';

const BASE_URL = 'https://i9a305.p.ssafy.io/api/backend';

interface AxiosOptions {
    [key: string]: any; 
  };

// 인증 값이 필요 없는 경우
const axiosApi = (url: string, options?: AxiosOptions) => {
    const instance = axios.create({ 
      baseURL: url,
      headers: { 'Access-Control-Allow-Origin' : 'http://localhost:3000' },
      ...options 
      })
    return instance;
};

// 인증 값이 필요한 경우
const axiosAuthApi = (url: string, options?: AxiosOptions) => {
    const token = sessionStorage.getItem('accessToken');
    const instance = axios.create({
      baseURL: url,
      headers: 
      { 
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin' : 'http://localhost:3000'
      },
      ...options,
    })
    return instance;
  };
  
  export const defaultInstance = axiosApi(BASE_URL);
  export const authInstance = axiosAuthApi(BASE_URL);
