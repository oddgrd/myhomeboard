import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Logo-simple.svg';
import styles from '../styles/Header.module.scss';

// Slimmed down header for landing to reduce first contentful paint
export const LandingHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={`/boards`}>
          <a className={styles.logo}>
            <Image
              src={logo}
              alt='Covegg19 Logo'
              width={42}
              height={42}
              priority={true}
            />
            <strong className='hide'>myHomeBoard</strong>
          </a>
        </Link>

        <nav>
          <ul>
            <li>
              <Link href={`/login`}>
                <a className='btn btn-link'>
                  <strong className={styles.landingLinks}>Get Started</strong>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/boards`}>
                <a className='btn btn-link'>
                  <strong className={styles.landingLinks}>Boards</strong>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
