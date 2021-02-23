import styles from '../styles/pages/CountDown.module.css'
import { useState, useEffect } from 'react'

export default function CountDown(){
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight]   = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')


    function StartCountDown(){
        setActive(true);
    }

    useEffect( ()=>{
        if(active && time > 0){
            setTimeout(()=>{
                setTime(time -1);
            }, 1000)
        }
    }, [active, time])

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

        <button type="button" className={styles.CountDownButton} onClick={StartCountDown}>
            Iníciar um ciclo
        </button>
    </>
    );
}