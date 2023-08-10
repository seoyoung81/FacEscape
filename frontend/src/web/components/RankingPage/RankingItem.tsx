import styles from './RankingPageComponent.module.css';
import RankSVG from '../../assets/images/rank.svg'
import type {Rankings} from '../../services/ranking';

type RankingItemProps = {
    rankInfo: Rankings
}

const RankingItem = ({rankInfo}: RankingItemProps) => {
    return (
        <div className={styles['ranking-item-container']}>
                <img 
                    className={styles['rank-icon']}
                    src={RankSVG} 
                    alt="logo"
                />
                
                <div className={styles['rank-item-text-container']}>
                    <div className={styles.time}>
                        {rankInfo.clearTime}
                    </div> 

                    <div className={styles['member-name']}>
                        {rankInfo.participants ? (
                            rankInfo.participants.map((member, index) => (
                                <div 
                                    key={index} 
                                    className={styles['name']}
                                    title={member.nickname}
                                >
                                    {member.nickname}
                                </div>
                            
                            ))
                        ) : (
                            null   
                        )}
                    </div> 

                    <div className={styles.date}>
                        {rankInfo.clearDate}
                    </div> 
                </div>
        </div>
    )
}

export default RankingItem;