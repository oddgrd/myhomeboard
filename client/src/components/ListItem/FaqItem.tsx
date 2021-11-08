import { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import styles from '../../styles/Faq.module.scss';
interface Props {
  question: string;
  answer: string;
}
export const FaqItem = ({ question, answer }: Props) => {
  const [showAnswer, toggleShowAnswer] = useState(false);
  return (
    <>
      <div
        className={styles.question}
        onClick={() => toggleShowAnswer(!showAnswer)}
      >
        {showAnswer ? (
          <FaChevronDown size={28} />
        ) : (
          <FaChevronRight size={28} />
        )}
        <h2>{question}</h2>
      </div>
      {showAnswer && <p>{answer}</p>}
    </>
  );
};
