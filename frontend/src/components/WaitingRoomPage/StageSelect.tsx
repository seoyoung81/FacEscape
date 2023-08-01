import styles from './WaitingRoom.module.css';
import { useState } from 'react';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const StageSelect: React.FC = () => {
    // 스테이지 이동
    const [value, setValue] = useState<number>(1);
    // 스테이지 전달
    const [stage, setStage] = useState<number>(1);

    const increase = () => {
        if (value !== 3) {
            setValue(value+1);
            setStage(stage+1);
        } 
    };
    const decrease = () => {
        if (value !== 1){
            setValue(value-1);
            setStage(stage-1);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = parseInt(event.target.value, 10);
        setStage(selectedValue);
    };
    
    return (
        <div className={styles['stage-container']}>
            <div>
                <IoIosArrowBack 
                    size={65}
                    onClick={decrease}
                    className={styles.icon}
                />
            </div>
            <div className={styles.stage}>
                <div>
                    <label>
                        <input type="radio" name="radio" onChange={handleChange} value={value} />
                        <span>{value}</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" onChange={handleChange} value={value+1} />
                        <span>{value+1}</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" onChange={handleChange} value={value+2} />
                        <span>{value+2}</span>
                    </label>
                </div>
            </div>
            <div>
                <IoIosArrowForward 
                    size={65} 
                    className={styles.icon}
                    onClick={increase}
                />
            </div>
        </div>
    )
};

export default StageSelect;