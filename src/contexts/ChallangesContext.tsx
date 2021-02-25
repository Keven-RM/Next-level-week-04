import { createContext, useState, ReactNode } from 'react'  
import challenges from '../../challenges.json'

interface ObjectTypes{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    LevelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: ObjectTypes;
    resetChallenge: () => void;
    experienceToNextLevel: number;
}

interface ChallengesProviderProps{
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export default function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(20)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function LevelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const Challenge = challenges[randomChallengeIndex]

        setActiveChallenge(Challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    return(
        <ChallengesContext.Provider value={
            { level,
              currentExperience, 
              challengesCompleted, 
              LevelUp, 
              startNewChallenge, 
              activeChallenge,
              resetChallenge,
              experienceToNextLevel
            }
        }>
            {children}
        </ChallengesContext.Provider>
    );
}