import { createContext, useState, ReactNode, useEffect } from 'react'  
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

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
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export default function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.challengesCompleted ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    
    function LevelUp(){
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect( ()=>{
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted])

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const Challenge = challenges[randomChallengeIndex]

        setActiveChallenge(Challenge)

        new Audio('./notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio! 🎉', {
                body: `Valendo ${Challenge.amount}xp`,
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
        return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
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
              experienceToNextLevel,
              completeChallenge,
              closeLevelUpModal
            }
        }>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}