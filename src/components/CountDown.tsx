import { useContext } from 'react';
import {CountdownContext} from '../contexts/CountDownContext'
import styles from '../styles/pages/CountDown.module.css'

export default function CountDown(){
    const { minutes, 
            seconds, 
            hasFinished, 
            isActive, 
            resetCountDown, 
            StartCountDown 
          }  = useContext(CountdownContext)

    const [minuteLeft, minuteRight]   = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

    return(
    <>
        <div className={styles.countdownConatainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>

            <span>:</span>

            <div>
                <span>{secondsLeft}</span>
                <span>{secondsRight}</span>
            </div>
        </div>

        {hasFinished ? (
            <button disabled className={styles.CountDownButton}>
                Ciclo encerrado
            </button>
        ): 
        
        <button type="button" className={
            isActive ?  `${styles.CountDownButtonActive} ${styles.CountDownButton}` : `${styles.CountDownButton}`
        } 
        onClick={isActive ? resetCountDown : StartCountDown}>
            { isActive ? 'Abandonar ciclo' : 'Iníciar um ciclo'}
        </button>}
    </>
    );
}