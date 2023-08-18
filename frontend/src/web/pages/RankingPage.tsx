import NavBar from "../components/NavBar/NavBar";
import styles from "./RankingPage.module.css";
import { useState, useEffect } from 'react';
import RankingView from "../components/RankingPage/RankingView";
import type {Rankings} from '../services/ranking';
import { defaultInstance } from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RankingPage :React.FC = () => {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [gameRankings, setGameRankings] = useState<Rankings[]>([]);

    const changeStage = useSelector((state: RootState) => state.setStage.stage)
    useEffect(() => {
        setCurrentStage(changeStage);
    }, [changeStage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await defaultInstance.get('/ranking', {
                    params: {
                        stage: currentStage
                    }
                })
                setGameRankings(data.rankings);
            } catch (error: any) {
                console.error('랭킹 조회 에러났음', error);
            }
        };
        fetchData();
    }, [changeStage]);

    return (
        <div className={styles['wrap-container']}>
            <NavBar />
            <div className={styles['main-container']}>
                <RankingView rankInfos={gameRankings} currentStage={currentStage} handlerStage={setCurrentStage}/>
            </div>
        </div>
    )
}

export default RankingPage;