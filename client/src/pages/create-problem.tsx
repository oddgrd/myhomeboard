import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { FaPencilAlt } from 'react-icons/fa';
import { Canvas } from '../components/Canvas';
import { useCanvas } from '../hooks/useCanvas';
import { useEffect } from 'react';
import { ProblemForm } from '../components/form/ProblemForm';

const CreateProblem = () => {
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();

  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);
  const array = ['1', '2', '#'];
  return (
    <Layout title='Create Problem'>
      <div className={styles.createProblem}>
        <h1>
          <FaPencilAlt /> Create Problem
        </h1>
        <div className={styles.editor}>
          <div
            className={styles.board}
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dqyhbqh0x/image/upload/c_scale,h_478,q_100,w_360/v1628264532/covegg19-0_1_0_ziflc1.jpg")`
            }}
          >
            <Canvas canvasRef={canvas} />
          </div>

          <ProblemForm />
        </div>
      </div>
    </Layout>
  );
};
export default CreateProblem;
