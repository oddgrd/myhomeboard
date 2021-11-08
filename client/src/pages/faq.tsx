import { useRouter } from 'next/router';
import { faqData } from '../assets/faqData';
import { FaqItem } from '../components/ListItem/FaqItem';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../styles/Faq.module.scss';
import Head from 'next/head';

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
    </>
  );
};

export default Faq;
