import { Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import * as Yup from 'yup';
import {
  useEditProblemMutation,
  useGetBoardQuery
} from '../../generated/graphql';
import styles from '../../styles/AscentForm.module.scss';
import { grades } from '../../utils/selectOptions';
import { Inputfield } from './Inputfield';
import { SelectField } from './SelectField';

interface Props {
  id: string;
  title: string;
  rules: string;
  grade: number;
  angle: number;
  boardSlug: string;
  onClose: () => void;
}
interface Values {
  title: string;
  rules: string;
  grade: number;
  angle: number;
}

export const EditProblemForm = ({
  id,
  title,
  rules,
  grade,
  angle,
  boardSlug,
  onClose
}: Props) => {
  const [success, setSuccess] = useState(false);
  const [editProblem] = useEditProblemMutation();
  const { data } = useGetBoardQuery({
    variables: { slug: boardSlug }
  });
  return (
    <Formik
      initialValues={
        {
          title: title,
          rules: rules,
          grade: grade,
          angle: angle
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
      {({ dirty, isValid }) => (
        <div className={styles.form}>
          {!success ? (
            <Form>
              <h1>Edit Problem</h1>
              <Inputfield
                name='title'
                type='text'
                label='Title'
                maxLength={31}
                placeholder='Problem title'
              />
              <Inputfield
                name='rules'
                type='text'
                label='Rules'
                maxLength={60}
              />
              <div className={styles.selectContainer}>
                {data?.getBoard && data.getBoard.angles.length > 1 ? (
                  <>
                    <SelectField
                      name='grade'
                      options={grades}
                      label='Grade'
                      width={145}
                    />
                    <SelectField
                      name='angle'
                      options={data.getBoard.angles.map((a) => {
                        return Object.fromEntries([
                          ['value', a],
                          ['label', a]
                        ]);
                      })}
                      label='Angle'
                      width={145}
                    />
                  </>
                ) : (
                  <SelectField
                    name='grade'
                    options={grades}
                    label='Grade'
                    width={300}
                  />
                )}
              </div>

              <input
                type='submit'
                className='btn'
                disabled={!dirty || !isValid}
                value='Save Problem'
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
