import styles from './Category.module.css';
import { useState } from 'react';

const SelecedItem: React.FC = () => {
    const [selectCheckBox, setsSelectCheckBox] = useState<boolean>(false);
    const onClick = () => {
        setsSelectCheckBox(!selectCheckBox);
    }
    console.log('지금 선택 된 것', selectCheckBox);
    return (
        <div>
            <div 
                className={`${styles.checkbox} ${selectCheckBox ? styles.active : ''}`}
                onClick={onClick}
            ></div>
        </div>
    )
}

export default SelecedItem;