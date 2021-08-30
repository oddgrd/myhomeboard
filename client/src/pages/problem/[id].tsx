import { Layout } from '../../components/Layout';
import { FaPencilAlt } from 'react-icons/fa';
import { Canvas } from '../../components/Canvas';
import { AscentItem } from '../../components/AscentItem';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect } from 'react';
import styles from '../../styles/Problem.module.scss';
import { useRouter } from 'next/router';
import { useGetProblemQuery } from '../../generated/graphql';
import Link from 'next/link';
import { grades, ratings } from '../../utils/ratingsAndGrades';

const Problem = () => {
  const router = useRouter();
  const problemId = typeof router.query.id === 'string' ? router.query.id : '';

  const [{ canvas }, { initViewer, loadFromCoords }] = useCanvas();
  const { data, loading, error } = useGetProblemQuery({
    variables: {
      id: problemId
    }
  });

  useEffect(() => {
    if (!initViewer) return;
    initViewer();
    if (!loadFromCoords || !data?.getProblem) return;
    loadFromCoords(data.getProblem.coordinates);
  }, [data?.getProblem, initViewer, loadFromCoords]);

  if (loading) {
    return <Layout>...loading</Layout>;
  }

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.getProblem) {
    return (
      <Layout>
        <p>Problem Not Found</p>
        <Link href='/'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  const { title, rules, grade, rating, ascents, creator } = data.getProblem;
  return (
    <Layout title='Problem'>
      <div className={styles.problem}>
        <h2 className={styles.mobileTitle}>{title}</h2>
        <div className={styles.viewer}>
          <div className={styles.board}>
            <Canvas canvasRef={canvas} />
          </div>
          <div>
            <h2 className={styles.desktopTitle}>{title}</h2>
            <p>Rules: {rules}</p>
            <p>{grades[grade].label}</p>
            <p>{rating || rating === 0 ? ratings[rating].label : 'Project'}</p>
            <p>Set by: {creator.name}</p>
          </div>
        </div>
        <div className={styles.ascents}>
          {ascents.length > 0 && <h3>Ascents:</h3>}
          {ascents &&
            ascents.map((ascent, idx) => {
              return <AscentItem ascent={ascent} key={idx} />;
            })}
        </div>
      </div>
    </Layout>
  );
};
export default Problem;
