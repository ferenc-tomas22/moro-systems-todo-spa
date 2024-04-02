import { Text } from '@/components';
import { useApi, useModal } from '@/context';

export const TasksActionsButton = () => {
  const { setTasks2Completed, deleteCompletedTasks } = useApi();
  const { showModal } = useModal();

  const handleSetTasks2Completed = () =>
    showModal({
      header: 'Označiť všetky tasky ako dokončené',
      body: 'Naozaj chcete označiť všetky tasky ako dokončené?',
      actionButton: { label: 'Označiť', onClick: setTasks2Completed },
    });

  const handleDeleteCompletedTasks = () =>
    showModal({
      header: 'Vymazať dokončené tasky',
      body: 'Naozaj chcete vymazať všetky dokončené tasky?',
      actionButton: { label: 'Vymazať', onClick: deleteCompletedTasks },
    });

  return (
    <div className='row gap-1 gap-md-0 my-2'>
      <div className='col-12 col-md-6'>
        <button
          type='button'
          onClick={handleSetTasks2Completed}
          className='btn btn-success w-100 border-secondary shadow rounded-3'
        >
          <Text typography='labelLarge' className='text-nowrap mb-0'>
            Označiť všetky tasky ako dokončené
          </Text>
        </button>
      </div>

      <div className='col-12 col-md-6'>
        <button
          type='button'
          onClick={handleDeleteCompletedTasks}
          className='btn btn-success w-100 border-secondary shadow rounded-3'
        >
          <Text typography='labelLarge' className='text-nowrap mb-0'>
            Vymazať dokončené tasky
          </Text>
        </button>
      </div>
    </div>
  );
};
