/*
GET /items?
    page={currentPage}&
    size={pageSize}&
    itemType={itemType}&
    keyword={keyword}
일단, page 1 size 6 itemType 말풍선 keyword 날개 로 만들어보자
*/
import ItemPurchase from "./ItemPurchase";
import ItemImg from "./ItemImg";
import styles from './Item.module.css';


export interface ItemType {
    ItemId: number;
    name: string;
    image: string;
    price: number;
    items: ItemType[]
}
 
export interface ApiResponse {
    items: ItemType[];
    currentPage: number;
    totalPages: number;
    isLastPage: boolean;
}

interface ChildProps {
    itemImg: string;
    itemName: string;
    itemPrice: number;
}

const Item :React.FC<ChildProps> = ({ itemImg, itemName, itemPrice }) => {
      
    return (
        <div className={styles.item}>
            <div>
                <ItemImg itemImg={itemImg}/>
                <ItemPurchase itemPrice={itemPrice}/>
            </div>
        </div>
    );
};
export default Item;