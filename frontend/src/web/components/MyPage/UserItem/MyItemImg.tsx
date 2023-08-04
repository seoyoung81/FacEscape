import styles from './UserItem.module.css';

const MyItemImg: React.FC = () => {
    return (
        <div className={styles['myimg-box']}>
            <img 
                src={require('../../../assets/images/wing.png')} 
                alt="wing" 
                className={styles['myitem-img']}
            />
        </div>
    )
};

export default MyItemImg;