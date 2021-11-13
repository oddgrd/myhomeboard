import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import { faqData } from '../assets/faqData';
import { FaqItem } from '../components/ListItem/FaqItem';
import styles from '../styles/Faq.module.scss';

const Faq = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>F.A.Q</title>
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
      <div className={styles.container}>
        <header className={styles.header}>
          <button
            aria-label='Go back'
            title='Go Back'
            className='btn btn-icon btn-animation'
            onClick={() => {
              router.back();
            }}
          >
            <FaArrowLeft size={38} />
          </button>
          <h1>F.A.Q</h1>
        </header>

        {faqData.map((item, idx) => {
          return <FaqItem {...item} key={idx} />;
        })}
      </div>
      <footer className={styles.footer}>
        <a
          href='https://github.com/oddgrd/myhomeboard'
          target='_blank'
          rel='noreferrer'
        >
          <p>
            <FaGithub /> Issues and feedback
          </p>
        </a>
      </footer>
    </>
  );
};

export default Faq;
