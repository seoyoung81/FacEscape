import styles from './UserItem.module.css';

interface imgProps {
    itemImg: string;
}

const MyItemImg: React.FC<imgProps> = ({ itemImg }) => {
    const img: string = itemImg ;
    return (
        <div className={styles['myimg-box']}>
            <img 
                src={`${img}`} 
                alt="wing" 
                className={styles['myitem-img']}
            />
        </div>
    )
};

export default MyItemImg;