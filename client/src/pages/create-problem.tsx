import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { Toolbar } from '../components/Toolbar';
import { Canvas } from '../components/Canvas';
import { useCanvas } from '../hooks/useCanvas';
import { useEffect } from 'react';
import { ProblemForm } from '../components/form/ProblemForm';

const CreateProblem = () => {
  const [{ canvas, coords, selectedColor }, { init, handleColor, undo }] =
    useCanvas();

  const toolbarProps = { handleColor, undo };

  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);
  //"https://res.cloudinary.com/dqyhbqh0x/image/upload/c_scale,h_717,q_100,w_540/v1628264532/covegg19-0_1_0_ziflc1.jpg"
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
export default CreateProblem;
