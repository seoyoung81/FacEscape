import { useState,useEffect } from "react";

const Test = () => {
    const [imageUrl, setImageUrl] = useState<string>("")
    useEffect (()=>{setImageUrl(`url(${imageUrl})`)}, [])
    console.log(imageUrl)
    return (
        <div>
             <img src={imageUrl} alt="이미지" />
             <img src="http://localhost:3000/5756e790-1211-49cb-8201-a9de0814a443" alt="이미지2" />
        </div>
    )
}

export default Test;

