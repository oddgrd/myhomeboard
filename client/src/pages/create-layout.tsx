import { Layout } from '../components/Layout';
import styles from '../styles/CreateProblem.module.scss';
import { LayoutForm } from '../components/form/LayoutForm';
import withApollo from '../utils/withApollo';

const CreateLayout = () => {
  return (
    <Layout title='Create Board'>
      <div className={styles.createProblem}>
        <LayoutForm />
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateLayout);
