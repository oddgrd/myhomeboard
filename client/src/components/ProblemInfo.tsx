import { Maybe } from '../generated/graphql';
import { grades } from '../utils/selectOptions';
import { StarRating } from './StarRating';

interface Props {
  name: string;
  rules: string;
  grade: number;
  consensusGrade: Maybe<number> | undefined;
  consensusRating: Maybe<number> | undefined;
  createdAt: string;
}

export const ProblemInfo = ({
  name,
  rules,
  consensusGrade,
  consensusRating,
  grade,
  createdAt
}: Props) => {
  return (
    <>
      <p>
        Grade:{' '}
        {typeof consensusGrade === 'number'
          ? grades[consensusGrade].label
          : grades[grade].label}
      </p>
      <p>
        Rating:{' '}
        {typeof consensusRating === 'number' ? (
          <StarRating rating={consensusRating} />
        ) : (
          'Project'
        )}
      </p>
      <p>Rules: {rules}</p>
      <p>Set by: {name}</p>
      <p>
        {new Date(+createdAt).toLocaleString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </>
  );
};
