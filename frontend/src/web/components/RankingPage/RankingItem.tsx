import styles from './RankingPageComponent.module.css';
import type {Rankings} from '../../services/ranking';
import { useState, useEffect } from 'react';
import rank1 from '../../assets/images/rank_1.png';
import rank2 from '../../assets/images/rank_2.png';
import rank3 from '../../assets/images/rank_3.png';
import rank4 from '../../assets/images/rank_4.png';

type RankingItemProps = {
    rankInfo: Rankings
    index: Number
}

const RankingItem = ({rankInfo, index}: RankingItemProps) => {
    const [rankingImg, setRankingImg] = useState<string>("");
    useEffect(() => {
        if (index === 0) {
            setRankingImg(rank1);
        } else if (index === 1) {
            setRankingImg(rank2);
        } else if (index === 2) {
            setRankingImg(rank3);
        } else {
            setRankingImg(rank4);
        }
    }, [index])
    return (
        <div className={styles['ranking-item-container']}>
                <img 
                    className={styles['rank-icon']}
                    src={rankingImg} 
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