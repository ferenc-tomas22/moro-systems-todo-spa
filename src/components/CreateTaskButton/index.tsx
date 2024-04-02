import { CreateTaskModal } from '@/components';
import { useModal } from '@/context';
import { FolderPlusIcon } from '@/icons';

export const CreateTaskButton = () => {
  const { showModal } = useModal();

  const handleCreateTask = () =>
    showModal({
      header: 'Priadať úlohu',
      body: <CreateTaskModal />,
    });

  return (
    <button
      type='button'
      onClick={handleCreateTask}
      className='btn btn-outline-primary border-secondary rounded-pill'
    >
      <FolderPlusIcon width='2rem' height='2rem' />
    </button>
  );
};
