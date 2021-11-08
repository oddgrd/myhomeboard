import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { ProblemSnippetFragment } from '../generated/graphql';
import styles from '../styles/ProblemItem.module.scss';
import { grades } from '../assets/selectOptions';
import { StarRating } from './StarRating';

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
    sendStatus,
  } = problem;
  return (
    <>
      <Link href={`/problem/${id}`}>
        <a>
          <div className={styles.problemItem}>
            <div className={styles.main}>
              <p className={styles.title}>{title}</p>
              <p>by {creator.name}</p>
            </div>
            <div className={styles.right}>
              {sendStatus && <FaCheck color='#00ddff' />}
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
