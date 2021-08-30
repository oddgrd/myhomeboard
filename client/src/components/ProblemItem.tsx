import { ProblemSnippetFragment } from '../generated/graphql';
import Link from 'next/link';
import styles from '../styles/ProblemItem.module.scss';
import { grades, ratings } from '../utils/ratingsAndGrades';
interface Props {
  problem: ProblemSnippetFragment;
}

export const ProblemItem = ({ problem }: Props) => {
  const { title, grade, rating, id, creator } = problem;
  return (
    <>
      <Link href={`/problem/${id}`}>
        <a>
          <div className={styles.problemItem}>
            <div>
              <p className={styles.title}>{title}</p>
              <p>by {creator.name}</p>
            </div>
            <div className={styles.gradeAndRating}>
              <p>{grades[grade].label}</p>
              <p>
                {rating || rating === 0 ? ratings[rating].label : 'Project'}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
