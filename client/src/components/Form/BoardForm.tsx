import styles from '../../styles/BoardForm.module.scss';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Textarea } from './Textarea';
import {
  useCreateBoardMutation,
  useEditBoardMutation,
} from '../../generated/graphql';
import { useRouter } from 'next/router';
import { Inputfield } from './Inputfield';
import { toast } from 'react-toastify';
import { toErrorMap } from '../../utils/toErrorMap';

interface Props {
  editProps?: {
    title: string;
    description: string;
    adjustable: boolean;
    angles: string;
    city: string;
    country: string;
    boardId: string;
  };
}
interface Values {
  title: string;
  description: string;
  adjustable: boolean;
  angles: string;
  city: string;
  country: string;
}

export const BoardForm = ({ editProps }: Props) => {
  const router = useRouter();
  const [createBoard] = useCreateBoardMutation();
  const [editBoard] = useEditBoardMutation();
  return (
    <Formik
      initialValues={
        editProps
          ? editProps
          : {
              title: '',
              description: '',
              adjustable: false,
              angles: '',
              city: '',
              country: '',
            }
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(16, 'Must be shorter than 17 characters')
          .required('Required'),
        description: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(80, 'Must be shorter than 80 characters')
          .required('Required'),
        city: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(60, 'Must be shorter than 60 characters')
          .required('Required'),
        country: Yup.string()
          .min(2, 'Must be 2 characters or more')
          .max(60, 'Must be shorter than 60 characters')
          .required('Required'),
        adjustable: Yup.bool().required('Required'),
        angles: Yup.string()
          .trim()
          .min(1, 'Must select at least one angle')
          .matches(
            /^(\d+)(,\s*\d+)*$/,
            'Please enter a comma separated list of angles.'
          )
          .required('Required'),
      })}
      onSubmit={async (values: Values, { setErrors }) => {
        let response;
        if (editProps) {
          response = await editBoard({
            variables: {
              options: {
                ...values,
                boardId: editProps.boardId,
                angles: values.angles.split(', ').map(Number),
                adjustable: values.angles.split(', ').length > 1,
              },
            },
            update: (cache) => {
              cache.evict({ id: 'Board:' + editProps.boardId });
            },
          });
          if (response.data?.editBoard.errors) {
            setErrors(toErrorMap(response.data.editBoard.errors));
          } else if (response.data?.editBoard.board) {
            toast.success('Board edited 🔧');
          }
        } else {
          response = await createBoard({
            variables: {
              options: {
                ...values,
                angles: values.angles.split(', ').map(Number),
                adjustable: values.angles.split(', ').length > 1,
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: 'getBoards' });
            },
          });
          if (response.data?.createBoard.errors) {
            setErrors(toErrorMap(response.data.createBoard.errors));
          } else if (response.data?.createBoard.board) {
            toast.success('Board created');
            router.push('/boards');
          }
        }
      }}
    >
      {({ dirty, isValid }) => (
        <div className={styles.boardForm}>
          <Form>
            {!editProps && <h1>Create Board</h1>}

            <Inputfield
              name='title'
              type='text'
              label='Title (Unique)'
              placeholder='Board title'
              maxLength={18}
            />
            <Inputfield
              name='city'
              type='text'
              label='City'
              placeholder='City'
              maxLength={60}
            />
            <Inputfield
              name='country'
              type='text'
              label='Country'
              placeholder='Country'
              maxLength={60}
            />
            <Inputfield
              name='angles'
              type='text'
              label='Angles (as comma separated list if several angles)'
              placeholder='10, 20, 30, 40'
            />
            <Textarea
              name='description'
              label='Description'
              placeholder='Brief description of your board'
              maxLength={80}
            />

            <input
              type='submit'
              className='btn'
              value={editProps ? 'Save Changes' : 'Save Board'}
              disabled={!dirty || !isValid}
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};
