import Head from 'next/head';
import styles from '../styles/Layout.module.scss';
import { Header } from './Header';

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}
export const Layout = ({
  title = 'myHomeBoard',
  keywords = 'climbing, climb, bouldering, board, boardclimbing, homeboard, homewall',
  description = 'Manage problems on your home climbing board',
  children,
}: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div>
        <Header />
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};
