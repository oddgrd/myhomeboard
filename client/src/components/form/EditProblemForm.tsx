import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import * as Yup from 'yup';
import { useEditProblemMutation } from '../../generated/graphql';
import styles from '../../styles/AscentForm.module.scss';
import { grades } from '../../utils/selectOptions';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';

interface Props {
  id: string;
  title: string;
  rules: string;
  grade: number;
  onClose: () => void;
}
interface Values {
  title: string;
  rules: string;
  grade: number;
}

export const EditProblemForm = ({
  id,
  title,
  rules,
  grade,
  onClose
}: Props) => {
  const [success, setSuccess] = useState(false);
  const [editProblem] = useEditProblemMutation();

  return (
    <Formik
      initialValues={
        {
          title: title,
          rules: rules,
          grade: grade
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
        const { errors } = await editProblem({
          variables: { options: { ...values, problemId: id } },
          update: (cache) => {
            cache.evict({ id: 'Problem:' + id });
          }
        });
        setSubmitting(false);
        if (errors) {
          console.log(errors);
        }
        if (!errors) {
          setSuccess(true);
          setTimeout(() => {
            onClose();
          }, 1300);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className={styles.form}>
          {!success ? (
            <Form>
              <h1>Edit Problem</h1>
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

              <input
                type='submit'
                className='btn'
                disabled={isSubmitting}
                value='Save Problem'
              />
            </Form>
          ) : (
            <div className={styles.success}>
              <FaCheck size={170} />
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};
