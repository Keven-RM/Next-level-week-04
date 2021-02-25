import { CompleteChallenges } from '../components/CompleteChallenges'
import CountDown from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import ChallengeBox  from '../components/ChallengeBox'

import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>Início | move.it</title>
    </Head>

    <div className={styles.container}>
      <ExperienceBar />
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
    </div>
    </>
    )
}
