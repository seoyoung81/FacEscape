import styles from './Item.module.css';

const ItemImg :React.FC = () => {
    // 사진은 response에서 가져오면 됨
    return (
        <div className={styles['img-container ']}>
            <div className={styles['img-box']}>
                <img 
                    src={require("../../../assets/images/wing.png")} 
                    alt="wing" 
                    className={styles['item-img']}
                />
            </div>
        </div>
    )
}
export default ItemImg;