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
    consensusGrade?: number | null;
    consensusRating?: number | null;
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
  const { title, grade, consensusRating, consensusGrade, id, creator } =
    problem;
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
                {typeof consensusGrade === 'number'
                  ? grades[consensusGrade].label
                  : grades[grade].label}
              </p>
              <p>
                {typeof consensusRating === 'number' ? (
                  <StarRating rating={consensusRating} />
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
