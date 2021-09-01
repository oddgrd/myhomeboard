import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import Image from 'next/image';
import { FaPlus, FaSignOutAlt, FaSignInAlt, FaSearch } from 'react-icons/fa';
import logo from '../../public/Logo-klatreapp.svg';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useApolloClient } from '@apollo/client';

export const Header = () => {
  const { data, loading } = useMeQuery({
    skip: isServer()
  });
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };
  let body = null;
  if (loading) {
  } else if (!data?.me) {
    body = (
      <li>
        <Link href='/login'>
          <a className='btn-secondary btn-icon'>
            <FaSignInAlt />
            <span className={styles.hide}>Login</span>
          </a>
        </Link>
      </li>
    );
  } else {
    body = (
      <>
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
        {/* <li>{data.me?.name} </li> */}
      </>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link href='/'>
            <a className={styles.logo}>
              <Image src={logo} alt='Covegg19 Logo' width={42} height={42} />
              <strong className={styles.hide}>myHomeBoard</strong>
            </a>
          </Link>
        </div>
        <nav>
          <ul>{body}</ul>
        </nav>
      </div>
    </header>
  );
};
