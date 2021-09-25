import { useLogoutMutation, useMeQuery } from '../generated/graphql';
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
import { useRouter } from 'next/router';

interface Props {
  onClose: () => void;
}

export const DropdownMenu = ({ onClose }: Props) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
    router.push('/');
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <ul>
        <li>
          <Link href='/'>
            <a className='btn btn-link btn-dropdown'>
              <FaHome size={28} /> Home
            </a>
          </Link>
        </li>
        <li>
          <Link href='/boards'>
            <a className='btn btn-link btn-dropdown'>
              <FaClipboardList size={28} /> Boards
            </a>
          </Link>
        </li>
        {data?.me ? (
          <>
            <li>
              <Link href='/profile'>
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
