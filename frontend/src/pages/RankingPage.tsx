import NavBar from "../components/NavBar/NavBar";
import styles from "./RankingPage.module.css";
import { useState } from 'react';
import RankingView from "../components/RankingPage/RankingView"

const RankingPage :React.FC = () => {
    return (
        <div className={styles['wrap-container']}>
            <NavBar />
            <div className={styles['main-container']}>
                <RankingView />
            </div>
        </div>
    )
}

export default RankingPage;