import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import styles from '../../styles/ProblemItem.module.scss';
import { grades } from '../../assets/selectOptions';
import { StarRating } from './../StarRating';
import { ProblemItemFragment } from '../../generated/graphql';

interface Props {
  problem: ProblemItemFragment;
  userId?: string;
}

export const ProblemItem = ({ problem, userId }: Props) => {
  const { title, grade, avgRating, avgGrade, id, creator, ascentIds } = problem;

  return (
    <>
      <Link href={`/problem/${id}`}>
        <a>
          <div className={styles.problemItem}>
            <div className={styles.main}>
              <p className={styles.title}>
                {title}{' '}
                {ascentIds && ascentIds.indexOf(userId || '') !== -1 && (
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
