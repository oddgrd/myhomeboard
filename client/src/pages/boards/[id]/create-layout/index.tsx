import { Layout } from '../../../../components/Layout';
import styles from '../../../../styles/CreateProblem.module.scss';
import { LayoutForm } from '../../../../components/Form/LayoutForm';
import withApollo from '../../../../utils/withApollo';
import { useIsAuth } from '../../../../hooks/useIsAuth';
import { useRouter } from 'next/router';

const CreateLayout = () => {
  useIsAuth();
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  return (
    <Layout title='Create Layout'>
      <div className={styles.createProblem}>
        <LayoutForm boardId={boardId} />
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateLayout);
