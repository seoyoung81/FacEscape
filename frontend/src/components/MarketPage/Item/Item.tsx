/*
GET /items?
    page={currentPage}&
    size={pageSize}&
    itemType={itemType}&
    keyword={keyword}
일단, page 1 size 6 itemType 말풍선 keyword 날개 로 만들어보자
*/
import ItemPurchase from "./ItemPurchase";

const Item :React.FC = () => {
    return (
        <>
        <ItemPurchase />
        </>
    )
}

export default Item;