import { useApolloClient } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaLongArrowAltLeft,
  FaPlus,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import logo from '../../public/Logo-klatreapp.svg';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import useWindowDimensions from '../hooks/useWindowDimensions';
import styles from '../styles/Header.module.scss';

export const Header = () => {
  const { width } = useWindowDimensions();
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  let nav = null;
  if (loading) {
  } else if (!data?.me) {
    nav = (
      <ul>
        <li>
          <Link href='/login'>
            <a className='btn-secondary btn-icon'>
              <FaSignInAlt />
              <span className={styles.hide}>Login</span>
            </a>
          </Link>
        </li>
      </ul>
    );
  } else {
    nav = (
      <ul>
        <li>
          <Link href='/problems'>
            <a className='btn btn-link btn-icon'>
              <FaSearch />
              <span className={styles.hide}>Browse Problems</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='/create-problem'>
            <a className='btn btn-link btn-icon'>
              <FaPlus />
              <span className={styles.hide}>Create Problem</span>
            </a>
          </Link>
        </li>

        <li>
          <button className='btn btn-link btn-icon' onClick={handleLogout}>
            <FaSignOutAlt /> <span className={styles.hide}>Logout</span>
          </button>
        </li>
      </ul>
    );
  }
  let head = null;
  if (router.pathname === '/problem/[id]' && width < 700) {
    head = (
      <button
        className='btn btn-icon btn-animation'
        onClick={() => {
          router.back();
        }}
      >
        <FaLongArrowAltLeft size={46} />
      </button>
    );
  } else {
    head = (
      <Link href='/'>
        <a className={styles.logo}>
          <Image src={logo} alt='Covegg19 Logo' width={42} height={42} />
          <strong className={styles.hide}>myHomeBoard</strong>
        </a>
      </Link>
    );
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>{head}</div>
        <nav>{nav}</nav>
      </div>
    </header>
  );
};
