import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallangesContext'
import { CountdownContext } from '../contexts/CountDownContext';
import styles from '../styles/pages/ChallengeBox.module.css'

export default function ChallengeBox(){
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountDown } = useContext(CountdownContext)

    function handleChallengeSuceeded(){
        completeChallenge();
        resetCountDown();
    }

    function handleChallengeFalied(){
        resetChallenge();
        resetCountDown();
    }

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
                        <button type="button" className={styles.challengeFailedButton}    
                                onClick={handleChallengeFalied}
                                >Falhei
                        </button>
                        <button type="button" className={styles.challengeSucceededButton} 
                                onClick={handleChallengeSuceeded}
                                >Completei
                        </button>
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