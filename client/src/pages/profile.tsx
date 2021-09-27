import { Layout } from '../components/Layout';
import withApollo from '../utils/withApollo';

interface Props {}

const Profile = ({}: Props) => {
  return (
    <Layout title="Profile">
      <h1>Profile</h1>
      <h3>Page under construction...</h3>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
