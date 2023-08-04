import { useState } from 'react';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdInventory } from 'react-icons/md';
import InventoryModal from '../Modal/InventoryModal';
import styles from './WaitingRoom.module.css'

const Inventory: React.FC = () => {
    const [inventory, setInventroy] = useState<boolean>(false);
    const onClick = () => {
        setInventroy(!inventory);
    };

    return (
        <div>
            {inventory ? (
                        <MdInventory
                            size={70}
                            className={styles.inventory}
                            onClick={onClick}
                        />
                    ) : (
                        <MdOutlineInventory2
                            size={70}
                            className={styles.inventory}
                            onClick={onClick}
                        />
                    )}
            <div> 
                {inventory && <InventoryModal setInventroy={setInventroy} /> }
            </div>
        </div>
    )
};

export default Inventory;