interface Props {
  question: string;
  answer: string;
}
export const FaqItem = ({ question, answer }: Props) => {
  return (
    <>
      <h3>{question}</h3>
      <p>{answer}</p>
    </>
  );
};
