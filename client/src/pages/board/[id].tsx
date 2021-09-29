import { Layout } from "../../components/Layout";
import withApollo from "../../utils/withApollo";

const Board = () => {
    return <Layout title="Title here">
        <h1>Board Settings</h1>
    </Layout>
};

export default withApollo({ssr: false})(Board);