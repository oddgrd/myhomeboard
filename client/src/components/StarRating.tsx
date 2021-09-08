import { FaStar, FaRegStar } from 'react-icons/fa';

interface Props {
  rating: number;
}

export const StarRating = ({ rating }: Props) => {
  const stars = new Array(rating + 1).fill(<FaStar color='#ffac33' />);

  while (stars.length < 3) {
    stars.push(<FaRegStar />);
  }
  return (
    <span>
      {stars.map((star, idx) => (
        <span key={idx}>{star}</span>
      ))}
    </span>
  );
};
