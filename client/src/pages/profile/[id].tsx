import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { useGetUserByIdQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import styles from "../../styles/Profile.module.scss";
import { grades } from "../../utils/selectOptions";

interface Props {}

const Profile = ({}: Props) => {
  const router = useRouter();
  const profileId = typeof router.query.id === "string" ? router.query.id : "";
  const { data, loading } = useGetUserByIdQuery({
    variables: { id: profileId },
  });
  if (!data && loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (!data?.getUserById) {
    return (
      <Layout>
        <p>Profile not found</p>
        <button
          className="btn"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </button>
      </Layout>
    );
  }
  const { name, avatar, createdAt, problems, ascents } = data.getUserById;

  const getAverage = (values: number[]) => {
    const sum = values.reduce((acc, val) => {
      return acc + val;
    });

    return Math.round(sum / values.length);
  };

  return (
    <Layout>
      <div className={styles.profile}>
        <section className={styles.head}>
          <Image src={avatar ? avatar : ""} width={96} height={96} />
          <h1>{name}</h1>
        </section>
        <section className={styles.snippets}>
          <div>
            <h3>Average Grade</h3>
            <strong>
              {ascents && grades[getAverage(ascents.map((a) => a.grade))].label}
            </strong>
          </div>
          <div className={styles.group}>
            <div>
              <h3>Problems</h3>
              <strong>{problems?.length}</strong>
            </div>

            <div>
              <h3>Ascents</h3>
              <strong>{ascents?.length}</strong>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
