import { authInstance } from "../../services/api";
import { useState, useEffect } from "react";

const Icon = () => {
    const [img, setImg] = useState<string>("");
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
                console.log(error);
            }
        };
        fetchData();
}, []);
    return (
        <div>
            <img src={`${img}`} alt="" style={{width: '40px', marginRight: '10px', marginBottom: '10px' }} />
        </div>
    )
};

export default Icon;