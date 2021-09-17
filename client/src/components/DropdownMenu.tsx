import { Maybe, useLogoutMutation } from '../generated/graphql';
import Link from 'next/link';
import {
  FaClipboardList,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { useApolloClient } from '@apollo/client';
import styles from '../styles/DropdownMenu.module.scss';

interface Props {
  data:
    | Maybe<{
        __typename?: 'User' | undefined;
        id: string;
        name: string;
        email: string;
        avatar?: Maybe<string> | undefined;
        createdAt: string;
        updatedAt: string;
      }>
    | undefined;
}

export const DropdownMenu = ({ data }: Props) => {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await apolloClient.resetStore();
    await logout();
  };

  return (
    <div className={styles.dropdown}>
      <ul>
        <li>
          <Link href='/boards'>
            <a className='btn btn-link btn-dropdown'>
              <FaClipboardList size={28} /> Boards
            </a>
          </Link>
        </li>
        {data ? (
          <>
            <li>
              <Link href='/#'>
                <a className='btn btn-link btn-dropdown'>
                  <FaUser size={28} /> Profile
                </a>
              </Link>
            </li>
            <li>
              <button
                className='btn btn-link btn-dropdown'
                onClick={handleLogout}
              >
                <FaSignOutAlt size={28} /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/'>
                <a className='btn btn-link btn-dropdown'>
                  <FaHome size={28} /> About
                </a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a className='btn btn-link btn-dropdown'>
                  <FaSignInAlt size={28} /> Login
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
