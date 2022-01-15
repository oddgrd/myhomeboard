import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { useCurves } from '../hooks/useCurves';
import styles from '../styles/Landing.module.scss';
import Image from 'next/image';
import logo from '../assets/images/Logo.svg';

const Landing = () => {
  const {
    layeredTopWave,
    layeredBottomWave,
    layeredTopWave2,
    blobVariants,
    startBlobVariants,
  } = useCurves();
  return (
    <div>
      <Head>
        <title>myHomeBoard</title>
        <meta
          name='description'
          content={'Home Climbing Board Management App'}
        />
        <meta
          name='keywords'
          content={
            'climbing, climb, bouldering, board, boardclimbing, homeboard, homewall'
          }
        />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <div className={styles.body}>
        <div className={styles.start}>
          <div className={styles.startAnimation}>
            <motion.svg
              id={styles.blobSvg}
              initial='start'
              animate='end'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <motion.path
                variants={startBlobVariants}
                width={350}
                transition={{
                  duration: 7,
                  repeatType: 'reverse',
                  repeat: Infinity,
                }}
                fill='#e9c46a'
              />
            </motion.svg>
            <Image src={logo} width={230} height={230} priority={true} />
          </div>

          <Link href='/boards'>
            <a className='btn btn-start'>
              <strong>GET STARTED</strong>
            </a>
          </Link>
        </div>
        <section className='yellow'>
          {layeredTopWave(
            '120',
            '#1c1c31',
            '#e76f51',
            '#eb8550',
            '#ebb05d',
            '#ebb05d'
          )}
          <div className={styles.content}>
            <h1>MyHomeBoard</h1>
            <p>
              Upload a photo of your home climbing board. Save, grade and rate
              problems. Share them with friends and register ascents.
            </p>
          </div>
        </section>
        <section className='orange'>
          {layeredTopWave(
            '160',
            '#e9c46a',
            '#ebb05d',
            '#eb8550',
            '#eb8550',
            '#e76f51'
          )}
          <div className={styles.content}>
            <h1>Create Problems</h1>
            <p>
              Create your own problems. Use green for start holds, blue for hand
              holds, yellow for feet-only and red for top holds. Specify your
              rules if needed, and suggest a grade.
            </p>
          </div>
        </section>
        <section>
          {layeredTopWave('180px')}
          <div className={styles.content}>
            <h1>Browse Problems</h1>
            <p>
              After choosing a board, browse its problems with grade and rating
              (or project status if unclimbed). A checkmark will appear on
              problems you have climbed.
            </p>
          </div>
        </section>
        <section className='purple'>
          {layeredTopWave2()}
          <div className={styles.content}>
            <h1>Register Ascents</h1>
            <p>
              When you top out a problem, register your ascent. Suggest a grade
              and a star-rating. The grade and rating of the problem is decided
              by the average of all ascentionist suggestions.
            </p>
            <Link href='/login'>
              <a className='btn' style={{ marginTop: '3.5rem' }}>
                <strong>GET STARTED</strong>
              </a>
            </Link>
          </div>

          {layeredBottomWave('350')}
        </section>

        <footer>
          <motion.svg
            id={styles.blobSvg}
            initial='start'
            animate='end'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.path
              variants={blobVariants}
              transition={{
                duration: 6,
                repeatType: 'reverse',
                repeat: Infinity,
              }}
              fill='#038373'
            />
          </motion.svg>

          <div className={styles.footerContent}>
            <a
              href='https://github.com/oddgrd'
              target='_blank'
              rel='noreferrer'
            >
              <p>
                oddgrd <FaGithub />
              </p>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
