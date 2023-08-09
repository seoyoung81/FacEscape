import NavBar from "../components/NavBar/NavBar";
import styles from "./RankingPage.module.css";
import { useState, useEffect } from 'react';
import RankingView from "../components/RankingPage/RankingView";
import type {Rankings} from '../services/ranking';
import { defaultInstance } from "../services/api";

const RankingPage :React.FC = () => {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [gameRankings, setGameRankings] = useState<Rankings[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await defaultInstance.get('/ranking')
                console.log('랭킹 데이터 조회', data);
                setGameRankings(gameRankings);
            } catch (error: any) {
                console.error('아이템 조회 에러났음', error);
            }
        };
        fetchData();
    }, [gameRankings]);

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