import styles from './BeforeEnter.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/nickNameSlice';

const InputNickname: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [defaultNickName, setDefaultNickName] = useState<string | null | readonly string[]>("");
  const [showError, setShowError] = useState(false); // 에러 표시 여부를 결정하는 상태 변수
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newNickName: string = event.target.value;
    setValue(newNickName);
    dispatch(setNickName(newNickName));
    setShowError(false); // 입력이 변경되었을 때 에러 상태를 숨깁니다.
  }

  const handleClick = () => {
    if (value) {
      console.log("닉네임 : " + value);
      navigate('/waiting');
      setNickName(value);
    } else {
      setShowError(true); // 에러 상태를 표시합니다.
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      setDefaultNickName("회원가입 된 유저임");
    } else {
      setDefaultNickName("");
    }
  }, [])

  return (
    <>
        <div className={styles['input-container']}>
          <input
            type="text"
            className={styles['nickname-input']}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={showError ? "아이디를 입력해주세요" : ""}
          />
          <button className={styles['enter-btn']} onClick={handleClick}>입장</button>
        </div>
    </>
  )
}

export default InputNickname;
