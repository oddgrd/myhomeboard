import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import * as Yup from 'yup';
import {
  CoordinatesInput,
  useCreateProblemMutation
} from '../../generated/graphql';
import { useTitleGenerator } from '../../hooks/useTitleGenerator';
import styles from '../../styles/ProblemForm.module.scss';
import { grades } from '../../utils/selectOptions';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';
import { toast } from 'react-toastify';

interface Props {
  coords?: CoordinatesInput[];
  boardId: string;
  layoutUrl: string | undefined;
  angles: number[];
}
interface Values {
  title: string;
  rules: string;
  grade: number;
  boardId: string;
  layoutUrl: string;
  coordinates: CoordinatesInput[];
  angle: number;
}

export const ProblemForm = ({ coords, boardId, layoutUrl, angles }: Props) => {
  const [validCoords, setValidCoords] = useState(true);
  const [createProblem] = useCreateProblemMutation();
  const router = useRouter();

  if (!layoutUrl) return null;
  return (
    <Formik
      validateOnMount
      initialValues={
        {
          title: '',
          rules: 'Feet follow hands',
          boardId,
          layoutUrl,
          coordinates: coords,
          angle: angles[0]
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
        angle: Yup.number().required('Required')
      })}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        if (!coords || coords.length < 3) {
          setValidCoords(false);
          return;
        } else {
          setValidCoords(true);
        }
        const { errors, data } = await createProblem({
          variables: { options: values },
          update: (cache) => {
            cache.evict({ fieldName: 'getProblems' });
          }
        });
        setSubmitting(false);
        if (errors) {
          toast.error('Server Error');
        }
        switch (data?.createProblem) {
          case 'SUCCESS':
            toast.success('Problem Created!');
            router.push(`/boards/${boardId}`);
            break;
          case 'DUPLICATE':
            toast.error('Title already exists');
            break;
          case 'ERROR':
            toast.error('Something went wrong');
            break;
          default:
            return;
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
                        ['label', a]
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

            {!validCoords && <p>Add at least three holds!</p>}
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
