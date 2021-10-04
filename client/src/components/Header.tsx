import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaArrowLeft, FaBars, FaPlusSquare } from 'react-icons/fa';
import logo from '../images/Logo-simple.svg';
import { useGetBoardQuery, useMeQuery } from '../generated/graphql';
import styles from '../styles/Header.module.scss';
import { DropdownMenu } from './DropdownMenu';
import { Modal } from './Modal/Modal';

export const Header = () => {
  const [menuModal, toggleMenuModal] = useState(false);
  const { data } = useMeQuery();
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data: boardData } = useGetBoardQuery({
    variables: { boardId },
    skip: boardId.length === 0
  });

  let head = (
    <Link href='/'>
      <a className={styles.logo}>
        <Image src={logo} alt='Covegg19 Logo' width={42} height={42} />
        <strong className='hide'>myHomeBoard</strong>
      </a>
    </Link>
  );
  let dynamicNav = null;

  switch (router.pathname) {
    case '/problem/[id]':
      head = (
        <button
          className='btn btn-icon btn-animation'
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft size={38} />
        </button>
      );
      break;
    case '/boards/[id]/create-problem':
      head = (
        <button
          className='btn btn-icon btn-animation'
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft size={38} />
        </button>
      );
      break;
    case '/boards/[id]':
      head = (
        <Link href='/boards'>
          <a className={styles.title}>
            <strong>{boardData?.getBoard.title}</strong>
          </a>
        </Link>
      );
      dynamicNav = (
        <li>
          <Link href={`/boards/${boardId}/create-problem`}>
            <a className='btn btn-link btn-icon'>
              <FaPlusSquare size={28} />
            </a>
          </Link>
        </li>
      );
      break;
    case '/boards':
      head = (
        <p className={styles.title}>
          <strong>Select Board</strong>
        </p>
      );
      break;
    case '/':
      dynamicNav = !data?.me ? (
        <li>
          <Link href={`/login`}>
            <a className='btn btn-link'>
              <strong>GET STARTED</strong>
            </a>
          </Link>
        </li>
      ) : (
        <li>
          <Link href={'/boards'}>
            <a className='btn btn-link'>
              <strong>BOARDS</strong>
            </a>
          </Link>
        </li>
      );
      break;
    case '/profile/[id]':
      head = (
        <button
          className='btn btn-icon btn-animation'
          onClick={() => {
            router.back();
          }}
        >
          <FaArrowLeft size={38} />
        </button>
      );
      break;
    default:
      dynamicNav = null;
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
