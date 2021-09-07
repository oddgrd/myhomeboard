import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

// todo: use modal?
export const EditProblemButton = ({ id }: Props) => {
  // const [editProblem] = useEditProblemMutation();
  const router = useRouter();
  return (
    <Link href={`#`}>
      <a className='btn'>
        <FaEdit size={22} />
      </a>
    </Link>
  );
};
