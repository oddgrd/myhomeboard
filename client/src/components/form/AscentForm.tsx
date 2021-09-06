import styles from '../../styles/Form.module.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form } from 'formik';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';
import { useAddAscentMutation } from '../../generated/graphql';
import { attempts, grades, ratings } from '../../utils/ratingsAndGrades';
import { useRouter } from 'next/router';
import { Textarea } from './Textarea';

interface Props {
  id: string;
}
interface Values {
  problemId: string;
  grade: number;
  rating: number;
  attempts: number;
  comment: string;
}

export const AscentForm = ({ id }: Props) => {
  const [addAscent] = useAddAscentMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={
        {
          problemId: id,
          comment: ''
        } as Values
      }
      validationSchema={Yup.object({
        grade: Yup.number().required('Required'),
        attempts: Yup.number().required('Required'),
        rating: Yup.number().required('Required')
      })}
      onSubmit={async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        const { errors } = await addAscent({
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
          router.push('/problems');
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className={styles.form}>
          <Form>
            <h1 className='hide'>Add Ascent</h1>
            <div className={styles.selectContainer}>
              <SelectField
                name='grade'
                options={grades}
                label='Grade'
                width={157}
              />
              <SelectField
                name='rating'
                options={ratings}
                label='Rating'
                width={157}
              />
            </div>
            <SelectField
              name='attempts'
              options={attempts}
              label='Attempts'
              width={324}
            />
            <Textarea name='comment' label='Comment' placeholder='Optional' />

            <input
              type='submit'
              className='btn'
              disabled={isSubmitting}
              value='Save Ascent'
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
