import styles from './UserItem.module.css';
import { useState, useEffect } from 'react';


const MyItemName: React.FC = () => {
    const [myItemName, setMyItemName] = useState<string>("");
    // api 응답 
    useEffect(() => {
        setMyItemName("날개 한 짝");
    }, [])

    return (
        <div className={styles['myitem-name']}>
           { myItemName } 
        </div>
    )
};

export default MyItemName;