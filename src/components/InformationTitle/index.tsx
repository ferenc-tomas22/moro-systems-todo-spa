import { Text } from '@/components';
import { useApp } from '@/context';

export const InformationTitle = () => {
  const { tasks } = useApp();

  return (
    <>
      <Text typography='titleLarge' className='text-center my-3'>
        Task Manager
      </Text>

      <div className='row'>
        <div className='col-12 col-md-4'>
          <Text typography='labelLarge' className='text-center mb-0'>
            Počet úloh: <strong>{tasks.length}</strong>
          </Text>
        </div>

        <div className='col-12 col-md-4'>
          <Text typography='labelLarge' className='text-center mb-0'>
            Počet dokončených úloh:{' '}
            <strong>{tasks.filter(({ completed }) => completed).length}</strong>
          </Text>
        </div>

        <div className='col-12 col-md-4'>
          <Text typography='labelLarge' className='text-center mb-0'>
            Počet nedokončených úloh:{' '}
            <strong>{tasks.filter(({ completed }) => !completed).length}</strong>
          </Text>
        </div>
      </div>
    </>
  );
};
