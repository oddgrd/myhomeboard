import styles from '../../styles/AscentForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { SelectField } from './SelectField';
import { attempts, grades, ratings } from '../../assets/selectOptions';
import { Textarea } from './Textarea';
import { useState } from 'react';
import {
  useAddAscentMutation,
  useEditAscentMutation,
} from '../../generated/graphql';
import { toast } from 'react-toastify';

interface Props {
  id: string;
  boardId?: string;
  onClose: () => void;
  editProps?: Values;
}
interface Values {
  problemId: string;
  grade: number;
  rating: number;
  attempts: number;
  comment: string;
}

export const AscentForm = ({ id, onClose, editProps, boardId }: Props) => {
  const [error, setError] = useState('');
  const [addAscent] = useAddAscentMutation();
  const [editAscent] = useEditAscentMutation();

  return (
    <Formik
      initialValues={
        editProps
          ? editProps
          : ({
              problemId: id,
              comment: '',
            } as Values)
      }
      validationSchema={Yup.object({
        grade: Yup.number().required('Required'),
        attempts: Yup.number().required('Required'),
        rating: Yup.number().required('Required'),
      })}
      onSubmit={async (values: Values) => {
        if (editProps) {
          const { errors } = await editAscent({
            variables: { options: values },
            update: (cache) => {
              cache.evict({ id: 'Problem:' + id });
              cache.evict({ fieldName: 'getProblems' });
            },
          });
          if (errors) setError(errors[0].message);
        }
        if (boardId) {
          const { errors } = await addAscent({
            variables: { options: { ...values, boardId } },
            update: (cache) => {
              cache.evict({ id: 'Problem:' + id });
              cache.evict({ fieldName: 'getProblems' });
            },
          });
          if (errors) setError(errors[0].message);
        }
        if (error) {
          toast.error(error);
          onClose();
        } else {
          toast.success(editProps ? 'Ascent edited 🔧' : 'Ascent added 🤙');
          onClose();
        }
      }}
    >
      {({ dirty, values }) => (
        <div className={styles.form}>
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
            <Textarea
              name='comment'
              label='Comment'
              placeholder='Optional'
              maxLength={80}
            />

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
        </div>
      )}
    </Formik>
  );
};
