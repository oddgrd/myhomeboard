import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars, FaLongArrowAltLeft, FaPlusSquare } from 'react-icons/fa';
import logo from '../../public/Logo-klatreapp.svg';
import { useMeQuery } from '../generated/graphql';
import styles from '../styles/Header.module.scss';
import { DropdownMenu } from './DropdownMenu';
import { Modal } from './Modal/Modal';

export const Header = () => {
  const [menuModal, toggleMenuModal] = useState(false);
  const { data } = useMeQuery();
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';

  let head = (
    <Link href='/'>
      <a className={styles.logo}>
        <Image src={logo} alt='Covegg19 Logo' width={42} height={42} />
        <strong>myHomeBoard</strong>
      </a>
    </Link>
  );
  let dynamicNav = null;
  if (
    router.pathname === '/problem/[id]' ||
    router.pathname === '/boards/[slug]/create-problem'
  ) {
    head = (
      <button
        className='btn btn-icon btn-animation'
        onClick={() => {
          router.back();
        }}
      >
        <FaLongArrowAltLeft size={62} />
      </button>
    );
  } else if (router.pathname === '/boards/[slug]') {
    head = (
      <Link href='/boards'>
        <a className={styles.logo}>
          <strong>{slug.replace('-', ' ')}</strong>
        </a>
      </Link>
    );
    dynamicNav = (
      <li>
        <Link href={`/boards/${slug}/create-problem`}>
          <a className='btn btn-link btn-icon'>
            <FaPlusSquare size={28} />
          </a>
        </Link>
      </li>
    );
  } else if (router.pathname === '/boards') {
    head = (
      <p className={styles.logo}>
        <strong>Select Board</strong>
      </p>
    );
  } else if (router.pathname === '/' && !data?.me) {
    head = (
      <Link href='/'>
        <a
          className={styles.logo}
          style={{ marginLeft: '14px', marginTop: '14px' }}
        >
          <Image src={logo} alt='Covegg19 Logo' width={48} height={48} />

          <strong className='hide'> myHomeBoard</strong>
        </a>
      </Link>
    );
    dynamicNav = (
      <li>
        <Link href={`/login`}>
          <a className='btn btn-link'>GET STARTED</a>
        </Link>
      </li>
    );
  } else if (router.pathname === '/' && data?.me) {
    head = (
      <Link href='/'>
        <a
          className={styles.logo}
          style={{ marginLeft: '14px', marginTop: '14px' }}
        >
          <Image src={logo} alt='Covegg19 Logo' width={48} height={48} />
          <strong className='hide'> myHomeBoard</strong>
        </a>
      </Link>
    );
    dynamicNav = (
      <li>
        <Link href={'/boards'}>
          <a className='btn btn-link'>BOARDS</a>
        </Link>
      </li>
    );
  } else {
    head = (
      <Link href='/'>
        <a className={styles.logo}>
          <Image src={logo} alt='Covegg19 Logo' width={48} height={48} />
          <strong> myHomeBoard</strong>
        </a>
      </Link>
    );
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>{head}</div>
        <nav>
          <ul>
            {dynamicNav}
            <li>
              <button
                className='btn btn-link'
                onClick={() => toggleMenuModal(!menuModal)}
              >
                <FaBars size={28} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {menuModal && (
          <Modal handleClose={() => toggleMenuModal(false)}>
            <DropdownMenu onClose={() => toggleMenuModal(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </header>
  );
};
