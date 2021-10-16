import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { useCurves } from '../hooks/useCurves';
import styles from '../styles/Landing.module.scss';
import withApollo from '../utils/withApollo';
import { LandingHeader } from '../components/LandingHeader';

const Landing = () => {
  const {
    layeredTopWave,
    layeredBottomWave,
    layeredTopWave2,
    bottomWave,
    blobVariants,
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
      <LandingHeader />

      <div className={styles.body}>
        <section className='yellow'>
          {layeredTopWave(
            '120',
            '#242440',
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

          {bottomWave()}
        </section>
        <section className='orange'>
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
          </div>
        </section>
        <section style={{ background: '#dd3f31' }}>
          {layeredTopWave(
            '190',
            '#3c31dd',
            '#af00ad',
            '#d50080',
            '#e11858',
            '#dd3f31'
          )}
          <div className={styles.content}>
            <h1>Profile</h1>
            <p>
              View statistics on your activity, including ascents, problems made
              and average grade.
            </p>
          </div>
        </section>
        <section>
          {layeredTopWave2(
            '190',
            '#dd3f31',
            '#ba2653',
            '#872961',
            '#502b5a',
            '#242440'
          )}
          <div className={styles.content}>
            <h1>Upload New Layouts</h1>
            <p>
              Reset your wall? Bought new holds? Simply upload a new photo of
              your board*.
            </p>
            <i>*Only Board Creator can upload new layouts</i>
            <Link href='/login'>
              <a className='btn' style={{ marginTop: '3.5rem' }}>
                <strong>GET STARTED</strong>
              </a>
            </Link>
          </div>
          {layeredBottomWave('400')}
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
            <span>created by </span>
            <a href='https://github.com/oddgrd' target='_blank'>
              oddgrd <FaGithub />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Landing);
