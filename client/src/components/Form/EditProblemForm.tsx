import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
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
  boardId: string;
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
  boardId,
  onClose
}: Props) => {
  const [editProblem] = useEditProblemMutation();
  const { data } = useGetBoardQuery({
    variables: { boardId }
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
      onSubmit={async (values: Values) => {
        const { errors } = await editProblem({
          variables: { options: { ...values, problemId: id } },
          update: (cache) => {
            cache.evict({ id: 'Problem:' + id });
          }
        });
        if (errors) {
          toast.error(errors[0].message);
        }
        if (!errors) {
          toast.success('Problem edited 🔧');
          onClose();
        }
      }}
    >
      {({ dirty, isValid }) => (
        <div className={styles.form}>
          <Form>
            <h1>Edit Problem</h1>
            <Inputfield
              name='title'
              type='text'
              label='Title'
              maxLength={31}
              placeholder='Problem title'
            />
            <Inputfield name='rules' type='text' label='Rules' maxLength={60} />
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
        </div>
      )}
    </Formik>
  );
};
