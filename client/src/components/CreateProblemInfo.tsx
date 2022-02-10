import styles from '../styles/ProblemInfo.module.scss';

export const CreateProblemInfo = () => {
  return (
    <div className={styles.createProblemInfo}>
      <p>
        <strong style={{ color: '#27b376' }}>Green:</strong> Start holds
      </p>
      <p>
        <strong style={{ color: '#3581d8' }}>Blue:</strong> Hand and/or
        footholds
      </p>
      <p>
        <strong style={{ color: '#f9a73e' }}>Yellow:</strong> Feet only
      </p>
      <p>
        <strong style={{ color: '#bf212f' }}>Red:</strong> Top holds
      </p>
    </div>
  );
};
