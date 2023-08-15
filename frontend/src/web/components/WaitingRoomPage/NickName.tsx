import { RoomMember } from '../../../common/webrtc/utils/types';
import styles from './WaitingRoom.module.css';
import Icon from '../Common/userIcon';

type NickNameProps = {
    getHostNickname: ()=> string
};

const NickName = ({ getHostNickname }: NickNameProps) => {
    return (
        <div className={styles['nickname-container']}>
            <div className={styles.nickname}>
                
                    <Icon />
                
                { getHostNickname() }
            </div>
            <div className={styles.waitroom}>님의 대기실</div>
        </div>
    )
};

export default NickName;
