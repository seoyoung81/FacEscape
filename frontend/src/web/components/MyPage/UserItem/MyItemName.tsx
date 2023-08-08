import styles from './UserItem.module.css';
import { useState, useEffect } from 'react';

interface nameProps {
    itemName: string;
}

const MyItemName: React.FC<nameProps> = ({ itemName }) => {

    return (
        <div className={styles['myitem-name']}>
           { itemName } 
        </div>
    )
};

export default MyItemName;