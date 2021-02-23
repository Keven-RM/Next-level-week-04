import styles from '../styles/pages/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Keven-RM.png" alt="Foto de perfil"/>
            <div>
                <strong>Keven Rodrgues Meirelles</strong>
                <p>
                    <img src="icons/level.svg"  alt="" />
                    Level 1
                </p>
            </div>
        </div>
    );
}