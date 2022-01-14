import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Canvas } from '../../../../components/Canvas';
import { ProblemForm } from '../../../../components/Form/ProblemForm';
import { Layout } from '../../../../components/Layout';
import { Toolbar } from '../../../../components/Toolbar';
import { useGetBoardQuery } from '../../../../generated/graphql';
import { useCanvas } from '../../../../hooks/useCanvas';
import { useIsWhitelisted } from '../../../../hooks/useIsWhitelisted';
import styles from '../../../../styles/CreateProblem.module.scss';
import withApollo from '../../../../utils/withApollo';

const CreateProblem = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const toolbarProps = { handleColor, undo };

  useIsWhitelisted(boardId);
  const { data, loading } = useGetBoardQuery({
    variables: { boardId },
  });

  useEffect(() => {
    if (!data?.getBoard) return;
    init();
  }, [init, data?.getBoard]);

  if (!data?.getBoard && !loading) {
    return (
      <Layout>
        <p>Board not found</p>
        <Link href='/'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  if (!data?.getBoard.currentLayout) {
    return null;
  }

  return (
    <Layout title='Create Problem'>
      <div className={styles.createProblem}>
        <div className={styles.editor}>
          <div className={styles.board}>
            <Canvas
              canvasRef={canvas}
              layoutUrl={data.getBoard.currentLayout.url}
            />
            <Toolbar {...toolbarProps} />
          </div>
          <ProblemForm
            coords={coords.current}
            boardId={boardId}
            layoutId={data?.getBoard.currentLayout?.id}
            angles={data?.getBoard.angles}
          />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(CreateProblem);
