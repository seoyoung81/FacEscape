import { authInstance } from "../../api/instance";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const Icon = () => {
    const [img, setImg] = useState<string>("");
    const iconRedner = useSelector((state: RootState) => state.iconRender);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await authInstance.get('/member/item/equipped')
                const balloonItem = data.items.find((item: any) => item.itemType === "아이콘");
                if (balloonItem) {
                    setImg(balloonItem.image);
                }
            } 
            catch (error) {

            }
        };
        fetchData();
}, [iconRedner]);
    return (
        <div>
            <img src={`${img}`} alt="" style={{width: '40px', marginRight: '10px', marginBottom: '10px' }} />
        </div>
    )
};

export default Icon;