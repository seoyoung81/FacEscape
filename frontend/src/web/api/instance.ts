import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // TODO: 백엔드 URL 변경 및 환경변수로 관리


interface AxiosOptions {
  [key: string]: any; 
};

// 인증 값이 필요 없는 경우
const axiosApi = (url: string, options?: AxiosOptions) => {
  const instance = axios.create({ 
    baseURL: url,
    headers: { 'Access-Control-Allow-Origin' : '*' },
      ...options 
    })
  return instance;
};

// 인증 값이 필요한 경우
const axiosAuthApi = (url: string, options?: AxiosOptions) => {
  const instance = axios.create({
    baseURL: url,
    headers: { 
      'Access-Control-Allow-Origin' : '*'
    },
    ...options
  })
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
export const expressAxios = axios.create({
  baseURL: "https://i9a305.p.ssafy.io"
});

authInstance.interceptors.request.use((config)=>{
  const token = sessionStorage.getItem("accessToken");
  if(token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});
