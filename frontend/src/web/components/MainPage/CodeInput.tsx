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
        navigate('/before');
        setCodeInput("");
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
