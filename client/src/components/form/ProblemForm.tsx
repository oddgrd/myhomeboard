import styles from '../../styles/Form.module.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form } from 'formik';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';
import {
  CoordinatesInput,
  useCreateProblemMutation
} from '../../generated/graphql';
import { grades } from '../../utils/ratingsAndGrades';
import { useState } from 'react';
interface Props {
  coords: CoordinatesInput[] | undefined;
}
interface Values {
  title: string;
  rules: string;
  grade: number;
  coordinates: CoordinatesInput[];
}

export const ProblemForm = ({ coords }: Props) => {
  const [validCoords, setValidCoords] = useState(true);
  const [createProblem] = useCreateProblemMutation();
  return (
    <Formik
      initialValues={
        {
          title: '',
          rules: 'Feet follow hands',
          grade: 0,
          coordinates: coords
        } as Values
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(250, 'Must be shorter than 250 characters')
          .required('Required'),
        rules: Yup.string()
          .min(3, 'Must be 3 characters or more')
          .max(50, 'Must be shorter than 1000 characters')
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
          variables: { createProblemOptions: values },
          update: (cache) => {
            cache.evict({ fieldName: 'posts' });
          }
        });
        setSubmitting(false);
        if (errors) {
          console.log(errors);
        }
        console.log({ ...values, coordinates: coords });
      }}
    >
      {({ isSubmitting }) => (
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
              <SelectField name='grade' options={grades} label='Grade' />
              {/* <SelectField name='rating' options={ratings} label='Rating' /> */}
            </div>

            <input
              type='submit'
              className='btn'
              disabled={isSubmitting}
              value='Save Problem'
            />

            {!validCoords && <p>Add at least three holds!</p>}
          </Form>
        </div>
      )}
    </Formik>
  );
};
