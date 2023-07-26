import NavBar from "../components/NavBar/NavBar";
import Item from "../components/MarketPage/Item/Item";
import MyMilage from "../components/MarketPage/Mileage/MyMilage";

const MarketPage = () => {
    return (
        <div>
            <NavBar />
            <MyMilage />
            <Item />
        </div>
    )
}

export default MarketPage;