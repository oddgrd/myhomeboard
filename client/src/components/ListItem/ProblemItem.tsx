import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import styles from '../../styles/ProblemItem.module.scss';
import { grades } from '../../assets/selectOptions';
import { StarRating } from './../StarRating';

interface Props {
  problem: {
    __typename?: 'ProblemItem' | undefined;
    id: string;
    title: string;
    grade: number;
    avgGrade?: number | null;
    avgRating?: number | null;
    angle: number;
    creatorId: string;
    createdAt: string;
    boardId: string;
    creator: {
      __typename?: 'User';
      id: string;
      name: string;
    };
    ascentIds: string[];
  };
  userId?: string;
}

export const ProblemItem = ({ problem, userId }: Props) => {
  const { title, grade, avgRating, avgGrade, id, creator } = problem;

  return (
    <>
      <Link href={`/problem/${id}`}>
        <a>
          <div className={styles.problemItem}>
            <div className={styles.main}>
              <p className={styles.title}>
                {title}{' '}
                {problem.ascentIds.indexOf(userId || '') !== -1 && (
                  <FaCheck color='#00ddff' />
                )}
              </p>
              <p>by {creator.name}</p>
            </div>
            <div className={styles.right}>
              <p>
                {typeof avgGrade === 'number'
                  ? grades[avgGrade].label
                  : grades[grade].label}
              </p>
              <p>
                {typeof avgRating === 'number' ? (
                  <StarRating rating={avgRating} />
                ) : (
                  'Project'
                )}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
