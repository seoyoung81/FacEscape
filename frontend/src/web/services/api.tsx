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
  const instance = axios.create({
    baseURL: url,
    headers: { 
      'Access-Control-Allow-Origin' : 'http://localhost:3000'
    },
    ...options
  })
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);

authInstance.interceptors.request.use((config)=>{
  const token = sessionStorage.getItem("accessToken");
  if(token) {
    config.headers.Authorization = token;
  }
  return config;
});