import styles from './WaitingRoom.module.css';
import { useState, useEffect } from 'react';

interface valueTypeProps {
    text: string;
    align: string
}

const SpeechBubble: React.FC<valueTypeProps> = (props) => {
    const [showBubble, setShowBubble] = useState(true);

    useEffect(() => {
        if (props.text) {
            setShowBubble(true);
        }
        // 3초 뒤에 말풍선을 숨기기
        const timer = setTimeout(() => {
            setShowBubble(false);
        }, 3000);

        // 컴포넌트가 언마운트될 때 타이머 클리어
        return () => clearTimeout(timer);
    }, [props.text]);

    // 말풍선 숨기기
    if (!props.text || !showBubble) {
        return null;
    };

    // 글자 수 조절
    const isLongText = props.text && props.text.length >= 10;

    const bubbleStyle: React.CSSProperties = {
        width: isLongText ? '150px' : 'auto',
        whiteSpace: isLongText ? 'normal' : 'nowrap'
    };
    
    return (
        <div>
            <div className={styles.bubble} style={bubbleStyle}>
                <span>{props.text}</span>
            </div>
        </div>
    )
};

export default SpeechBubble;