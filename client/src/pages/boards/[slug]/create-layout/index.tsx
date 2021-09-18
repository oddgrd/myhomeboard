import { Layout } from '../../../../components/Layout';
import styles from '../../../../styles/CreateProblem.module.scss';
import { LayoutForm } from '../../../../components/Form/LayoutForm';
import withApollo from '../../../../utils/withApollo';
import { useIsAuth } from '../../../../hooks/useIsAuth';
import { useRouter } from 'next/router';

const CreateLayout = () => {
  useIsAuth();
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';

  return (
    <Layout title='Create Layout'>
      <div className={styles.createProblem}>
        <LayoutForm slug={slug} />
      </div>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreateLayout);
