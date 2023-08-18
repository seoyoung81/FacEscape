import styles from './WaitingRoom.module.css';

type StartBtnProps = {
    handleClick: ()=>void
};

const StartBtn = ({handleClick}: StartBtnProps) => {
    return (
        <div>
            <button 
                className={styles['start-btn']}
                onClick={handleClick}
            >START</button>
        </div>
    )
};

export default StartBtn;