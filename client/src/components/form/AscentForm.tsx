import styles from '../../styles/AscentForm.module.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form } from 'formik';
import { SelectField } from './SelectField';
import {
  AddAscentMutationFn,
  EditAscentMutationFn
} from '../../generated/graphql';
import { attempts, grades, ratings } from '../../utils/selectOptions';
import { Textarea } from './Textarea';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface Props {
  id: string;
  onClose: () => void;
  mutation: AddAscentMutationFn | EditAscentMutationFn;
  editProps?: Values;
}
interface Values {
  problemId: string;
  grade: number;
  rating: number;
  attempts: number;
  comment: string;
}

export const AscentForm = ({ id, onClose, mutation, editProps }: Props) => {
  const [success, setSuccess] = useState(false);

  return (
    <Formik
      initialValues={
        editProps
          ? editProps
          : ({
              problemId: id,
              comment: ''
            } as Values)
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
        const { errors } = await mutation({
          variables: { options: values },
          update: (cache) => {
            cache.evict({ fieldName: 'getProblem' });
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
      {(props) => (
        <div className={styles.form}>
          {!success ? (
            <Form>
              <h1>{!editProps ? 'Add' : 'Edit'} Ascent</h1>
              <div className={styles.selectContainer}>
                <SelectField
                  name='grade'
                  options={grades}
                  label='Grade *'
                  width={157}
                />
                <SelectField
                  name='rating'
                  options={ratings}
                  label='Rating *'
                  width={157}
                />
              </div>
              <SelectField
                name='attempts'
                options={attempts}
                label='Attempts *'
                width={324}
              />
              <Textarea name='comment' label='Comment' placeholder='Optional' />

              <input
                type='submit'
                className='btn'
                value='Save Ascent'
                disabled={!props.isValid}
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
