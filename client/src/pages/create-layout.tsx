import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { LayoutForm } from '../components/Form/LayoutForm';
import withApollo from '../utils/withApollo';
import { useIsAuth } from '../hooks/useIsAuth';

const CreateLayout = () => {
  useIsAuth();
  return (
    <Layout title='Create Layout'>
      <div className={styles.createProblem}>
        <LayoutForm />
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateLayout);
