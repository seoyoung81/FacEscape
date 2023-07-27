import NavBar from "../components/NavBar/NavBar";
import Item from "../components/MarketPage/Item/Item";
import MyMilage from "../components/MarketPage/Mileage/MyMilage";
import ItemList from "../components/MarketPage/Item/ItemList";
import SearchItem from "../components/MarketPage/Search/SearchItem";
import Category from "../components/MarketPage/Category/Category";
import styles from "./MarketPage.module.css";

const MarketPage = () => {
    return (
        <div>
            <NavBar />
            <div className={styles['market-container']}>
                <div>
                    <SearchItem />
                    <Category />
                </div>
                <div>
                    <MyMilage />
                    <ItemList />
                </div>
            </div>
        </div>
    )
}

export default MarketPage;