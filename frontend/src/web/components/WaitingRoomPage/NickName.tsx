import styles from './WaitingRoom.module.css';

type NickNameProps = {
    nickname: string
};

const NickName = ({nickname}: NickNameProps) => {
    return (
        <div className={styles['nickname-container']}>
            <div className={styles.nickname}>
                {nickname || "GAME"}
            </div>
            <div className={styles.waitroom}>님의 대기실</div>
        </div>
    )
};

export default NickName;
