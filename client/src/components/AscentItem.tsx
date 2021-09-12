import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaEllipsisV, FaQuoteRight } from 'react-icons/fa';
import { Maybe, useEditAscentMutation } from '../generated/graphql';
import styles from '../styles/AscentItem.module.scss';
import { attempts, grades } from '../utils/selectOptions';
import { DeleteAscentButton } from './buttons/deleteAscentButton';
import { AscentForm } from './form/AscentForm';
import Modal from './Modal';
import { StarRating } from './StarRating';

interface Props {
  ascent: {
    __typename?: 'Ascent' | undefined;
    userId: string;
    attempts: number;
    grade: number;
    rating: number;
    comment: string;
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

export const AscentItem = ({ ascent, problemId, currentUserId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const scrollIntoViewRef = useRef<HTMLDivElement>(null);
  const [showOptions, toggleShowOptions] = useState(false);
  const [editAscent] = useEditAscentMutation();

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
    createdAt
  } = ascent;
  const editProps = {
    grade,
    rating,
    attempts: attemptsCount,
    problemId,
    comment
  };

  return (
    <div className={styles.ascentItem}>
      <div className={styles.avatar}>
        <Image
          width={48}
          height={48}
          src={user.avatar as string}
          alt='User Avatar'
        />
      </div>
      <div>
        <p className={styles.name}>{user.name}</p>
        <div className='flex'>
          <p>
            {attempts[attemptsCount].label}
            {attemptsCount > 0 && ' attempts'}
          </p>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.gradeAndRating}>
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
      {showOptions && (
        <div className={styles.lower}>
          <div className={styles.comment}>
            {comment.length > 0 && (
              <p>
                <FaQuoteRight />
                {comment}
              </p>
            )}
            <i>
              {new Date(+createdAt).toLocaleString('en-GB', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </i>
          </div>
          {currentUserId === userId && (
            <div className={styles.options}>
              <button
                className='btn btn-link'
                onClick={() => setShowModal(true)}
              >
                <FaEdit size={26} />
              </button>
              <DeleteAscentButton id={problemId} />
            </div>
          )}
        </div>
      )}
      <div ref={scrollIntoViewRef}></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AscentForm
            onClose={() => setShowModal(false)}
            editProps={editProps}
            mutation={editAscent}
            id={problemId}
          />
        </Modal>
      )}
    </div>
  );
};
