import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaCog, FaEllipsisV, FaQuoteRight } from 'react-icons/fa';
import { Maybe } from '../../generated/graphql';
import styles from '../../styles/AscentItem.module.scss';
import { attempts, grades } from '../../assets/selectOptions';
import { DeleteAscentButton } from '../Button/deleteAscentButton';
import { AscentForm } from '../Form/AscentForm';
import { Modal } from '../Modal/Modal';
import { StarRating } from '../StarRating';
import { AnimatePresence, motion } from 'framer-motion';
import { useApolloClient } from '@apollo/client';

interface Props {
  ascent: {
    __typename?: 'Ascent' | undefined;
    userId: string;
    attempts: number;
    grade: number;
    rating: number;
    comment: string;
    boardId: string;
    createdAt: string;
    user: {
      __typename?: 'User' | undefined;
      name: string;
      avatar?: Maybe<string> | undefined;
    };
  };
  problemId: string;
  currentUserId: string | undefined;
}
const dropDown = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.12,
    },
  },
};

export const AscentItem = ({ ascent, problemId, currentUserId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const scrollIntoViewRef = useRef<HTMLDivElement>(null);
  const [showOptions, toggleShowOptions] = useState(false);

  const apolloClient = useApolloClient();
  const handleProfileClick = () => {
    apolloClient.cache.evict({ fieldName: 'getUser' });
  };
  useEffect(() => {
    if (showOptions && scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showOptions]);
  const {
    grade,
    rating,
    user,
    attempts: attemptsCount,
    userId,
    comment,
    createdAt,
  } = ascent;
  const editProps = {
    grade,
    rating,
    attempts: attemptsCount,
    problemId,
    comment,
  };

  return (
    <div className={styles.ascentItem}>
      <div className={styles.avatar}>
        <Link href={`/profile/${userId}`}>
          <a onClick={handleProfileClick} aria-label={`${user.name} profile`}>
            <Image
              width={52}
              height={52}
              src={user.avatar as string}
              priority={true}
              alt=''
            />
          </a>
        </Link>
      </div>
      <div>
        <p className={styles.name}>{user.name.split(' ')[0]}</p>
        <div className='flex'>
          <p>
            {attempts[attemptsCount].label}
            {attemptsCount > 0 && ' attempts'}
          </p>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div
          className={styles.gradeAndRating}
          onClick={() => toggleShowOptions(!showOptions)}
        >
          <p>{grades[grade].label}</p>
          {<StarRating rating={rating} />}
        </div>
        <button
          className='btn btn-icon'
          onClick={() => toggleShowOptions(!showOptions)}
        >
          <FaEllipsisV size={24} />
        </button>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={false}
        onExitComplete={() => null}
      >
        {showOptions && (
          <motion.div
            className={styles.lower}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={dropDown}
            key='options'
          >
            <div className={styles.comment}>
              {comment.length > 0 && (
                <p>
                  <FaQuoteRight />
                  {comment}
                </p>
              )}
              <i>
                {new Date(createdAt).toLocaleString('en-GB', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </i>
            </div>
            {currentUserId === userId && (
              <div className={styles.options}>
                <button
                  className='btn btn-link'
                  onClick={() => setShowModal(true)}
                >
                  <FaCog size={26} />
                </button>
                <DeleteAscentButton id={problemId} />
              </div>
            )}
          </motion.div>
        )}

        {showModal && (
          <Modal handleClose={() => setShowModal(false)}>
            <AscentForm
              onClose={() => setShowModal(false)}
              editProps={editProps}
              id={problemId}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div ref={scrollIntoViewRef}></div>
    </div>
  );
};
