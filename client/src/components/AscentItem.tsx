import { Maybe } from '../generated/graphql';
import styles from '../styles/AscentItem.module.scss';
import { grades, ratings } from '../utils/ratingsAndGrades';
import Image from 'next/image';

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
}

export const AscentItem = ({ ascent }: Props) => {
  const { grade, rating, user, attempts } = ascent;
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
        {attempts === 1 ? <p>Flash</p> : <p>{attempts} attempts</p>}
      </div>
      <div className={styles.gradeAndRating}>
        <p>{grades[grade].label}</p>
        <p>{rating || rating === 0 ? ratings[rating].label : 'Project'}</p>
      </div>
    </div>
  );
};
