import Image from "next/image";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";
import { useGetUserByIdQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import styles from "../../styles/Profile.module.scss";
import { attempts, grades, ratings } from "../../utils/selectOptions";

const Profile = () => {
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
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => {
      return acc + val;
    });

    return Math.round(sum / values.length);
  };

  return (
    <Layout>
      <div className={styles.profile}>
        <section className={styles.head}>
          <div>
            <Image src={avatar ? avatar : ""} width={62} height={62} />
          </div>

          <h1>{name}</h1>
        </section>

        <section className={styles.snippets}>
          <h1>Performance</h1>
          <div className={styles.content}>
            {ascents && ascents.length > 0 ? (
              <>
                <div>
                  <h3>Ascents</h3>
                  <strong>{ascents?.length}</strong>
                </div>
                <div>
                  <h3>Average Grade</h3>
                  <strong>
                    {grades[getAverage(ascents.map((a) => a.grade))].label}
                  </strong>
                </div>
                <div>
                  <h3>Average Attempts</h3>
                  <strong>
                    {attempts[getAverage(ascents.map((a) => a.attempts))].label}
                  </strong>
                </div>
              </>
            ) : (
              <div>
                <h1>N/A</h1>
              </div>
            )}
          </div>
        </section>
        <section className={styles.snippets}>
          <h1>{name}'s Problems</h1>
          <div className={styles.content}>
            {problems && problems.length > 0 ? (
              <>
                <div>
                  <h3>Problems</h3>
                  <strong>{problems?.length}</strong>
                </div>
                <div>
                  <h3>Average Grade</h3>
                  <strong>
                    {
                      grades[
                        getAverage(
                          problems
                            .filter((p) => typeof p.consensusGrade === "number")
                            .map((p) => p.consensusGrade as number)
                        )
                      ].label
                    }
                  </strong>
                </div>
                <div>
                  <h3>Average Rating</h3>
                  <strong>
                    {
                      ratings[
                        getAverage(
                          problems
                            .filter(
                              (p) => typeof p.consensusRating === "number"
                            )
                            .map((p) => p.consensusRating as number)
                        )
                      ].label
                    }
                  </strong>
                </div>
              </>
            ) : (
              <div>
                <h1>N/A</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
