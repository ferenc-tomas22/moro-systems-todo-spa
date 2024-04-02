import { Text, UpdateTaskModal } from '@/components';
import { useApi, useModal } from '@/context';
import { ClipboardCheckIcon, ClipboardUncheckIcon, TrashIcon } from '@/icons';
import { ITask } from '@/model';

type TaskProps = {
  position: number;
  task: ITask;
};

export const Task: React.FC<TaskProps> = ({ task, position }) => {
  const { updateTaskStatus, deleteTask } = useApi();
  const { showModal } = useModal();

  const handleUpdateTask = () =>
    showModal({
      header: 'Aktualizovať úlohu',
      body: <UpdateTaskModal task={task} />,
    });

  const handleUpdateTaskStatus = () =>
    showModal({
      header: 'Aktualizovať úlohu',
      body: `Naozaj si praješ aktualizovať túto úlohu na ${
        task.completed ? 'nedokončenú' : 'dokončenú'
      }?`,
      actionButton: {
        label: 'Aktualizovať',
        onClick: () => updateTaskStatus(task.id, !task.completed),
      },
    });

  const handleDeleteTask = () =>
    showModal({
      header: 'Vymazať úlohu',
      body: 'Naozaj si praješ zmazať túto úlohu?',
      actionButton: { label: 'Zmazať', onClick: () => deleteTask(task.id) },
    });

  return (
    <div
      role='alert'
      className={`row shadow mb-2 alert alert-${task.completed ? 'success' : 'primary'}`}
    >
      <div className='d-flex align-items-center col-1'>
        <Text typography='labelLarge' className='text-dark mb-0'>
          {`${position}. `}
        </Text>
      </div>

      <div className='d-flex align-items-center col-1'>
        <Text typography='labelRegular' className='text-dark mb-0'>
          {new Date(task.createdDate).toLocaleDateString()}
        </Text>
      </div>

      <div className='d-flex align-items-center justify-content-center col-6'>
        <button
          type='button'
          onClick={handleUpdateTask}
          className='btn btn-link w-100 text-decoration-none text-reset p-0'
        >
          <Text typography='labelLarge' className='text-dark mb-0'>
            {task.text}
          </Text>
        </button>
      </div>

      <div className='d-flex align-items-center justify-content-end col-3'>
        <button
          type='button'
          onClick={handleUpdateTaskStatus}
          className='btn btn-link p-0 text-decoration-none text-reset'
        >
          {task.completed ? (
            <div className='d-flex align-items-center gap-2'>
              <Text typography='labelRegular' className='text-dark mb-0'>
                {task.completedDate && new Date(task.completedDate).toLocaleDateString()}
              </Text>
              <ClipboardCheckIcon width='1.5rem' height='1.5rem' className='text-dark' />
            </div>
          ) : (
            <ClipboardUncheckIcon width='1.5rem' height='1.5rem' className='text-dark' />
          )}
        </button>
      </div>

      <div className='d-flex align-items-center justify-content-end col-1'>
        <button
          type='button'
          onClick={handleDeleteTask}
          className='btn btn-link p-0 text-decoration-none text-reset'
        >
          <TrashIcon width='1.5rem' height='1.5rem' className='text-dark' />
        </button>
      </div>
    </div>
  );
};
