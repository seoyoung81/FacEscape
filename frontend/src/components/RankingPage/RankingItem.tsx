import styles from './RankingPageComponent.module.css';
import RankSVG from '../../assets/images/rank.svg'

const RankingItem :React.FC = () => {
    return (
        <div className={styles['ranking-item-container']}>
                <img 
                    className={styles['rank-icon']}
                    src={RankSVG} 
                    alt="logo"
                />
                
                <div className={styles['rank-item-text-container']}>
                    <div>
                        mm:ss
                    </div> 

                    <div>
                        사람1 사람2 사람3 사람4 사람5 사람6
                    </div> 

                    <div>
                        yyyy:MM:dd
                    </div> 
                </div>
        </div>
    )
}

export default RankingItem;