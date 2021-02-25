import styles from '../styles/pages/CountDown.module.css'
import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'

let countdownTimeout: NodeJS.Timeout

export default function CountDown(){
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime]               = useState(0.1 * 60)
    const [isActive, setIsActive]       = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight]   = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')


    function StartCountDown(){
        setIsActive(true);
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1*60)
    }

    useEffect( ()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time -1);
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

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