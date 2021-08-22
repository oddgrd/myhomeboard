import styles from '../../styles/Form.module.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form } from 'formik';
import { Inputfield } from './Inputfield';
import { CoordinatesInput } from '../../generated/graphql';

interface Values {
  title: string;
  rules: string;
  grade: number;
  rating: number;
  coordinates: CoordinatesInput;
}

export const ProblemForm = () => {
  return (
    <Formik
      initialValues={{
        title: '',
        rules: 'Feet follow hands',
        grade: 0,
        rating: 0,
        coordinates: { x: 0, y: 0, color: '' }
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(250, 'Must be shorter than 250 characters')
          .required('Required'),
        text: Yup.string()
          .min(3, 'Must be 3 characters or more')
          .max(1000, 'Must be shorter than 1000 characters')
          .required('Required')
      })}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        // const { errors } = await createPost({
        //   variables: { input: values },
        //   update: (cache) => {
        //     cache.evict({ fieldName: 'posts' });
        //   }
        // });
        // setSubmitting(false);
        // if (!errors) {
        //   router.push('/');
        // }
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <div className={styles.form}>
          <Form>
            <Inputfield
              name='title'
              type='text'
              label='Title'
              placeholder='Problem title'
            />
            <Inputfield name='rules' type='text' label='Rules' />
            <button type='submit' className='btn' disabled={isSubmitting}>
              Create Problem
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
