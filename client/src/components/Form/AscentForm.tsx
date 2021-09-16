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
import { motion } from 'framer-motion';

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
      {({ dirty, values }) => (
        <div className={styles.form}>
          {!success ? (
            <Form>
              <h1>{!editProps ? 'Add' : 'Edit'} Ascent</h1>
              <div className={styles.selectContainer}>
                <SelectField
                  name='grade'
                  options={grades}
                  label='Grade *'
                  width={145}
                />
                <SelectField
                  name='rating'
                  options={ratings}
                  label='Rating *'
                  width={145}
                />
              </div>
              <SelectField
                name='attempts'
                options={attempts}
                label='Attempts *'
                width={300}
              />
              <Textarea name='comment' label='Comment' placeholder='Optional' />

              <input
                type='submit'
                className='btn'
                value='Submit Ascent'
                disabled={
                  typeof values.grade !== 'number' ||
                  typeof values.rating !== 'number' ||
                  typeof values.attempts !== 'number' ||
                  !dirty
                }
              />
            </Form>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
              className={styles.success}
            >
              <FaCheck size={170} />
            </motion.div>
          )}
        </div>
      )}
    </Formik>
  );
};
