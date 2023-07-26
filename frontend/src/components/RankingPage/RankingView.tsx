import styles from './RankingPageComponent.module.css';
import RankingItem from './RankingItem';


const RankingView = () => {
    return (
        <div className={styles['ranking-view-container']}>
            <div className={styles['ranking-header']}>
                    Ranking
            </div>
            
            <div className={styles['ranking-body']}>
                <RankingItem />
                <RankingItem />
                <RankingItem />
                <RankingItem />
                <RankingItem />
                <RankingItem />
            </div>
        </div>
    )
}

export default RankingView;