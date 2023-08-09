import axios from 'axios';
import { Dispatch } from 'redux';
import { setToken } from '../../store/store';
import store from '../..//store/store';
import { setIsLogIn } from '../../store/authSlice';

const fetchToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      email: 'yourUsername',
      password: 'yourPassword',
    });
    return response.data.acessToken;
  } catch (error) {
    console.error('Failed to fetch token', error);
    return null;
  }
};

const initToken = async (dispatch: Dispatch) => {
  const { token } = store.getState().user;
  
  if (!token) {
    const newToken = await fetchToken();
    if (newToken) {
      dispatch(setToken(newToken));
      dispatch(setIsLogIn(true)); 
      axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }
  }
};

export { initToken, fetchToken };
