import { Maybe } from '../generated/graphql';
import styles from '../styles/ProblemInfo.module.scss';
import { grades } from '../assets/selectOptions';
import { StarRating } from './StarRating';

interface Props {
  name: string;
  rules: string;
  grade: number;
  consensusGrade: Maybe<number> | undefined;
  consensusRating: Maybe<number> | undefined;
  angle: number;
  createdAt: string;
}

export const ProblemInfo = ({
  name,
  rules,
  consensusGrade,
  consensusRating,
  grade,
  angle,
  createdAt,
}: Props) => {
  return (
    <div className={styles.problemInfo}>
      <div className={styles.ratingAndGrade}>
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
