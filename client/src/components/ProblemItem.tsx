import { ProblemSnippetFragment, useMeQuery } from '../generated/graphql';
import Link from 'next/link';
import styles from '../styles/ProblemItem.module.scss';
import { grades } from '../utils/selectOptions';
import { StarRating } from '../utils/StarRating';
import { FaCheck } from 'react-icons/fa';

interface Props {
  problem: ProblemSnippetFragment;
}

export const ProblemItem = ({ problem }: Props) => {
  const {
    title,
    grade,
    consensusRating,
    consensusGrade,
    id,
    creator,
    sendStatus
  } = problem;

  return (
    <>
      <Link href={`/problem/${id}`}>
        <a>
          <div className={styles.problemItem}>
            <div className={styles.titleDiv}>
              <p className={styles.title}>{title}</p>
              <p>by {creator.name}</p>
            </div>
            <div className={styles.gradeAndRating}>
              {sendStatus && <FaCheck color='#00ddff' />}
              <p>
                {consensusGrade
                  ? grades[consensusGrade].label
                  : grades[grade].label}
              </p>
              <p>
                {consensusRating || consensusRating === 0 ? (
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
