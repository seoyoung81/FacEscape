import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPageComponent.module.css';

const CodeInput :React.FC = () => {
    const [codeInput, setCodeInput] = useState<string>("");
    const navigate = useNavigate();
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCodeInput(event.target.value);
        // console.log(codeInput);
    }
    const handleClick = () => {
        if(codeInput){
            // 소켓서버로 join요청
            // 성공시 세션스토리지에 저장
            navigate('/before');
        }
        else{
            alert("입장 코드를 입력해주세요!");
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className={styles['code-container']}>
            <input 
                type="text" 
                placeholder="코드를 입력하세요" 
                className={styles['code-input']}
                value={codeInput}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className={styles['code-btn']}
                onClick={handleClick}
            >
                입장
            </button>

        </div>
    )
}

export default CodeInput;
