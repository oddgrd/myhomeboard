import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { Canvas } from '../../../../components/Canvas';
import { CreateProblemInfo } from '../../../../components/CreateProblemInfo';
import { ProblemForm } from '../../../../components/Form/ProblemForm';
import { Layout } from '../../../../components/Layout';
import { Modal } from '../../../../components/Modal/Modal';
import { Toolbar } from '../../../../components/Toolbar';
import { useGetBoardQuery } from '../../../../generated/graphql';
import { useCanvas } from '../../../../hooks/useCanvas';
import { useIsWhitelisted } from '../../../../hooks/useIsWhitelisted';
import styles from '../../../../styles/CreateProblem.module.scss';
import withApollo from '../../../../utils/withApollo';

const CreateProblem = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const toolbarProps = { handleColor, undo };

  useIsWhitelisted(boardId);
  const { data, loading } = useGetBoardQuery({
    variables: { boardId },
    skip: !router.isReady,
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
    <Layout
      title='Create Problem'
      navChildren={
        <button
          onClick={() => {
            setShowInfoModal(true);
          }}
          className='btn btn-link btn-icon'
          aria-label='Info'
          title='Info'
        >
          <FaInfo size={27} />
        </button>
      }
    >
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
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {showInfoModal && (
          <Modal handleClose={() => setShowInfoModal(false)}>
            <CreateProblemInfo />
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateProblem);
