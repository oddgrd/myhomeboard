import { Maybe } from '../generated/graphql';
import styles from '../styles/ProblemInfo.module.scss';
import { grades } from '../assets/selectOptions';
import { StarRating } from './StarRating';

interface Props {
  name: string;
  rules: string;
  grade: number;
  avgGrade: Maybe<number> | undefined;
  avgRating: Maybe<number> | undefined;
  angle: number;
  createdAt: string;
}

export const ProblemInfo = ({
  name,
  rules,
  avgGrade,
  avgRating,
  grade,
  angle,
  createdAt,
}: Props) => {
  return (
    <div className={styles.problemInfo}>
      <div className={styles.ratingAndGrade}>
        <p>{grades[avgGrade ?? grade].label}</p>
        <p>
          {typeof avgRating === 'number' ? (
            <StarRating rating={avgRating} />
          ) : (
            'Project'
          )}
        </p>
      </div>

      <p>
        <strong>Angle:</strong> {angle}°
      </p>
      <p>
        <strong>Rules:</strong> {rules}
      </p>
      <p>
        <strong>Set by:</strong> {name}
      </p>
      <p>
        <i>
          {new Date(+createdAt).toLocaleString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </i>
      </p>
    </div>
  );
};
