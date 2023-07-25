import styles from './User.module.css'

const GoogleLogin :React.FC = () => {
    return (
        <div>
            <button className={styles.google}>Google Login</button>
        </div>
    )
}

export default GoogleLogin;