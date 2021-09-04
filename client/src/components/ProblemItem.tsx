import { ProblemSnippetFragment, useMeQuery } from '../generated/graphql';
import Link from 'next/link';
import styles from '../styles/ProblemItem.module.scss';
import { grades, ratings } from '../utils/ratingsAndGrades';
import { StarRating } from '../utils/StarRating';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { isServer } from '../utils/isServer';

interface Props {
  problem: ProblemSnippetFragment;
}

export const ProblemItem = ({ problem }: Props) => {
  const [sendStatus, setSendStatus] = useState(false);
  const { data, loading } = useMeQuery({
    skip: isServer()
  });
  const { title, grade, rating, id, creator, ascents } = problem;
  const userIds = ascents?.map((ascent) => ascent.userId);

  useEffect(() => {
    if (!userIds || !data?.me) return;
    if (userIds.includes(data.me.id)) {
      setSendStatus(true);
    }
  }, []);

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
              {sendStatus && <FaCheck color='#00ddff' />}
              <p>{grades[grade].label}</p>
              <p>
                {rating || rating === 0 ? (
                  <StarRating rating={rating} />
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
