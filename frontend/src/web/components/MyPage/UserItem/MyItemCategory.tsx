import styles from './UserItem.module.css';
import { useState } from 'react';



const MyItemCategory: React.FC = () => {
    // 어떤 카테고리가 선택 되었는지: api에 담아서 요청 보내야 함
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <div className={styles['radio-input']}>
                <label>
                    <input 
                        type="radio" 
                        id="value-1" 
                        name="value-radio" 
                        value="말풍선" 
                        checked={selectedValue === "말풍선"}
                        onChange={handleRadioChange} 
                    />
                    <span>말풍선</span>
                </label>
                <label>
                    <input 
                        type="radio" 
                        id="value-2" 
                        name="value-radio" 
                        value="아이템" 
                        checked={selectedValue === "아이템"}
                        onChange={handleRadioChange} 
                    />
                    <span>아이콘</span>
                </label>
                <label>
                    <input 
                        type="radio" 
                        id="value-3" 
                        name="value-radio" 
                        value="화면효과" 
                        checked={selectedValue === "화면효과"}
                        onChange={handleRadioChange} 
                    />
                    <span>화면효과</span>
                </label>
                <label>
                    <input 
                        type="radio" 
                        id="value-4" 
                        name="value-radio" 
                        value="음성효과" 
                        checked={selectedValue === "음성효과"}
                        onChange={handleRadioChange} 
                    />
                    <span>음성효과</span>
                </label>
                    <span className={styles['selection']}></span>
                </div>
        </div>
    )
};

export default MyItemCategory;