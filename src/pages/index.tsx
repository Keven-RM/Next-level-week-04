import Head from 'next/head'
import { GetServerSideProps } from 'next'

import ChallengesProvider from '../contexts/ChallangesContext'
import { CompleteChallenges } from '../components/CompleteChallenges'
import CountDown from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import ChallengeBox  from '../components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountDownContext'

import styles from '../styles/pages/Home.module.css'

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <>
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}  
    >
      <Head>
        <title>Início | move.it</title>
      </Head>
      <div className={styles.container}>
        <ExperienceBar />
        <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <CountDown />
          </div>
            <ChallengeBox />
          <div>
          </div>
        </section>
      </CountdownProvider>
      </div>
    </ChallengesProvider>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted} = ctx.req.cookies

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}