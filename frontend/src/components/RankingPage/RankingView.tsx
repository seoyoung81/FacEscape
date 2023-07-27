import styles from './RankingPageComponent.module.css';
import RankingItem from './RankingItem';
import DropDownIcon from '../../assets/images/i-dropdown.svg'

const RankingView = () => {
    return (
        <div className={styles['ranking-view-container']}>
            <div className={styles['ranking-header']}>
                <div className={styles['ranking-view-title']}>
                    Ranking
                </div>

                <div className={styles['ranking-stage-dropdown']}>
                    <div className={styles['ranking-stage-dropdown-selector']}>
                        <div>
                            STAGE
                        </div>
                        <img className={styles['rank-icon']} src={DropDownIcon} alt="dropdown" />
                    </div>

                    <div className={styles['ranking-stage-dropdown-group']}>
                        <div>
                            stage1
                        </div>
                        <div>
                            stage2
                        </div>
                        <div>
                            stage3
                        </div>
                        <div>
                            stage4
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles['ranking-body']}>
                <RankingItem />
                <RankingItem />
                <RankingItem />
                <RankingItem />
                <RankingItem />
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