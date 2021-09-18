import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Canvas } from '../../../../components/Canvas';
import { ProblemForm } from '../../../../components/Form/ProblemForm';
import { Layout } from '../../../../components/Layout';
import { Toolbar } from '../../../../components/Toolbar';
import { useGetBoardQuery } from '../../../../generated/graphql';
import { useCanvas } from '../../../../hooks/useCanvas';
import { useIsAuth } from '../../../../hooks/useIsAuth';
import styles from '../../../../styles/CreateProblem.module.scss';
import withApollo from '../../../../utils/withApollo';

const CreateProblem = () => {
  const [{ canvas, coords }, { init, handleColor, undo }] = useCanvas();
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';
  const toolbarProps = { handleColor, undo };

  const { data, loading } = useGetBoardQuery({
    variables: { slug: 'covegg-19' }
  });

  useIsAuth();
  useEffect(() => {
    if (!init) return;
    init();
  }, [init]);

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
              cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME!}
            />
            <Toolbar {...toolbarProps} />
          </div>
          <ProblemForm
            coords={coords?.current}
            slug={slug}
            layoutUrl={data?.getBoard.currentLayout?.url}
          />
        </div>
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: true })(CreateProblem);
