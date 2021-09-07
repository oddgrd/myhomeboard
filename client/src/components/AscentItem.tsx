import { Maybe } from '../generated/graphql';
import styles from '../styles/AscentItem.module.scss';
import { grades, attempts } from '../utils/selectOptions';
import Image from 'next/image';
import { StarRating } from '../utils/StarRating';
import { DeleteAscentButton } from './buttons/deleteAscentButton';
import { EditProblemButton } from './buttons/editProblemButton';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

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
  const [showOptions, toggleShowOptions] = useState(false);
  const { grade, rating, user, attempts: attemptsCount, userId } = ascent;
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
          <EditProblemButton id={'123'} />
        </div>
      )}
    </div>
  );
};
