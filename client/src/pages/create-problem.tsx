import { useEffect } from 'react';
import { Canvas } from '../components/Canvas';
import { ProblemForm } from '../components/Form/ProblemForm';
import { Layout } from '../components/Layout';
import { Toolbar } from '../components/Toolbar';
import { useCanvas } from '../hooks/useCanvas';
import { useIsAuth } from '../hooks/useIsAuth';
import styles from '../styles/CreateProblem.module.scss';
import withApollo from '../utils/withApollo';

const CreateProblem = () => {
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const toolbarProps = { handleColor, undo };
  useIsAuth();
  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);

  return (
    <Layout title='Create Problem'>
      <div className={styles.createProblem}>
        <div className={styles.editor}>
          <div className={styles.board}>
            <Canvas canvasRef={canvas} />
            <Toolbar {...toolbarProps} />
          </div>
          <ProblemForm coords={coords?.current} />
        </div>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateProblem);
