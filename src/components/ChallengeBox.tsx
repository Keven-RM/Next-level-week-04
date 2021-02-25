import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import styles from '../styles/pages/ChallengeBox.module.css'

export default function ChallengeBox(){
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

    return(
        <div className={styles.challengeBoxCotainer}>
            { activeChallenge
            ?( 
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="icon"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={resetChallenge} >Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
            )

            :(
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up" />
                    <br />
                    Avance de level completando desafios.
                </p>
            </div>  
            )
            }
        </div>
    )
}