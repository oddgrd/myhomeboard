import { Maybe, useEditAscentMutation } from '../generated/graphql';
import styles from '../styles/AscentItem.module.scss';
import { grades, attempts } from '../utils/selectOptions';
import Image from 'next/image';
import { StarRating } from '../utils/StarRating';
import { DeleteAscentButton } from './buttons/deleteAscentButton';
import { AscentForm } from './form/AscentForm';
import { useState } from 'react';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import Modal from './Modal';

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
  const [showOptions, toggleShowOptions] = useState(false);
  const [editAscent] = useEditAscentMutation();

  const {
    grade,
    rating,
    user,
    attempts: attemptsCount,
    userId,
    comment
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
          disabled={currentUserId !== userId}
        >
          <FaEllipsisV size={24} />
        </button>
      </div>
      {currentUserId === userId && showOptions && (
        <div className={styles.options}>
          <DeleteAscentButton id={problemId} />
          <button className='btn' onClick={() => setShowModal(true)}>
            <FaEdit size={22} />
          </button>
        </div>
      )}
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
