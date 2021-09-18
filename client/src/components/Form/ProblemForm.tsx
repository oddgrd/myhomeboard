import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  CoordinatesInput,
  useCreateProblemMutation
} from '../../generated/graphql';
import styles from '../../styles/ProblemForm.module.scss';
import { grades } from '../../utils/selectOptions';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';

interface Props {
  coords?: CoordinatesInput[];
  slug: string;
  layoutUrl: string | undefined;
}
interface Values {
  title: string;
  rules: string;
  grade: number;
  boardSlug: string;
  layoutUrl: string;
  coordinates: CoordinatesInput[];
}

export const ProblemForm = ({ coords, slug, layoutUrl }: Props) => {
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
          boardSlug: slug,
          layoutUrl,
          coordinates: coords
        } as Values
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(60, 'Must be shorter than 60 characters')
          .required('Required'),
        rules: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(80, 'Must be shorter than 80 characters')
          .required('Required'),
        grade: Yup.number().required('Required')
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
        const { errors } = await createProblem({
          variables: { options: values },
          update: (cache) => {
            cache.evict({ fieldName: 'getProblems' });
          }
        });
        setSubmitting(false);
        if (errors) {
          console.log(errors);
        }
        if (!errors) {
          router.push(`/boards/${slug}`);
        }
      }}
    >
      {({ values }) => (
        <div className={styles.form}>
          <Form>
            <h1 className='hide'>Create Problem</h1>
            <Inputfield
              name='title'
              type='text'
              label='Title'
              placeholder='Problem title'
            />
            <Inputfield name='rules' type='text' label='Rules' />
            <div className={styles.selectContainer}>
              <SelectField
                name='grade'
                options={grades}
                label='Grade'
                width={324}
              />
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
