import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/pages/CompleteChallenges.module.css'

export function CompleteChallenges(){
    const { challengesCompleted } = useContext(ChallengesContext);

    return(
        <div className={styles.completeChallengesContainar}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}