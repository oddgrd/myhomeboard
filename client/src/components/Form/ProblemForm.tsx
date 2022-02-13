import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FaRandom } from 'react-icons/fa';
import * as Yup from 'yup';
import {
  CoordinatesInput,
  useCreateProblemMutation,
} from '../../generated/graphql';
import { useTitleGenerator } from '../../hooks/useTitleGenerator';
import styles from '../../styles/ProblemForm.module.scss';
import { grades } from '../../assets/selectOptions';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';
import { toast } from 'react-toastify';
import { toErrorMap } from '../../utils/toErrorMap';
import { useSorting } from '../../hooks/useSorting';

interface Props {
  coords?: CoordinatesInput[];
  boardId: string;
  layoutId: string | undefined;
  angles: number[];
}
interface Values {
  title: string;
  rules: string;
  grade: number;
  boardId: string;
  layoutId: string;
  coordinates: CoordinatesInput[];
  angle: number;
}

export const ProblemForm = ({ coords, boardId, layoutId, angles }: Props) => {
  const [createProblem] = useCreateProblemMutation();
  const router = useRouter();
  const [{}, { selectSort }] = useSorting();
  if (!layoutId) return null;
  return (
    <Formik
      validateOnMount
      initialValues={
        {
          title: '',
          rules: 'Feet follow hands',
          boardId,
          layoutId,
          coordinates: coords,
          angle: angles[0],
        } as Values
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(31, 'Must be shorter than 31 characters')
          .required('Required'),
        rules: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(60, 'Must be shorter than 60 characters')
          .required('Required'),
        grade: Yup.number().required('Required'),
        angle: Yup.number().required('Required'),
      })}
      onSubmit={async (values: Values, { setErrors }) => {
        if (!coords || coords.length < 2) {
          toast.error('Mark at least two holds!');
          return;
        }
        const response = await createProblem({
          variables: { options: values },
          update: (cache) => {
            cache.evict({ fieldName: 'getProblems' });
          },
        });

        if (response.data?.createProblem.errors) {
          setErrors(toErrorMap(response.data.createProblem.errors));
        } else if (response.data?.createProblem.problem) {
          toast.success(`Problem created  🧗`);
          selectSort('newest');
          router.push(`/boards/${boardId}`);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <div className={styles.form}>
          <Form>
            <h1 className='hide'>Create Problem</h1>
            <div className={styles.titleInput}>
              <Inputfield
                name='title'
                type='text'
                label='Title'
                placeholder='Problem title'
                maxLength={31}
              />
              <button
                type='button'
                className={styles.random}
                onClick={(e) => {
                  blur();
                  setFieldValue('title', useTitleGenerator(2));
                }}
              >
                <FaRandom size={25} />
              </button>
            </div>
            <Inputfield name='rules' type='text' label='Rules' maxLength={60} />
            <div className={styles.selectContainer}>
              {angles.length > 1 ? (
                <>
                  <SelectField
                    name='grade'
                    options={grades}
                    label='Grade'
                    width={157}
                  />
                  <SelectField
                    name='angle'
                    options={angles.map((a) => {
                      return Object.fromEntries([
                        ['value', a],
                        ['label', a],
                      ]);
                    })}
                    label='Angle'
                    width={157}
                  />
                </>
              ) : (
                <SelectField
                  name='grade'
                  options={grades}
                  label='Grade'
                  width={324}
                />
              )}
            </div>

            <input
              type='submit'
              className='btn'
              value='Save Problem'
              disabled={
                values.title.length < 2 ||
                typeof values.grade !== 'number' ||
                values.rules.length < 2
              }
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
