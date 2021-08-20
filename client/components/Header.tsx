import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import Image from 'next/image';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link href='/'>
            <a className={styles.logo}>
              <Image
                src='/Logo-klatreapp.svg'
                alt='Covegg19 Logo'
                width={42}
                height={42}
              />
              <strong>Covegg19</strong>
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href='/create-post'>
                <a className='btn-secondary btn-icon'>
                  <FaPlus />
                  <span className='hide'>Create Problem</span>
                </a>
              </Link>
            </li>

            <li>
              <button className='btn-secondary btn-icon'>
                <FaSignOutAlt /> <span className='hide'>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
