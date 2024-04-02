import { Text } from '@/components';
import { useApi } from '@/context';

enum OPTION_VALUE {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL',
}

export const TasksFilterSelect = () => {
  const { getTasks, getCompletedTasks, getIncompleteTasks } = useApi();

  const handleFilterChange = (value: OPTION_VALUE) => {
    switch (value) {
      case OPTION_VALUE.ALL:
        getTasks();
        break;

      case OPTION_VALUE.COMPLETED:
        getCompletedTasks();
        break;

      case OPTION_VALUE.INCOMPLETE:
        getIncompleteTasks();
        break;
    }
  };

  return (
    <div className='col-12 col-md-6 col-lg-4 col-xxl-3 mx-auto'>
      <select
        className='form-select text-center shadow-sm'
        onChange={({ target: { value } }) => handleFilterChange(value as OPTION_VALUE)}
      >
        <option value={OPTION_VALUE.ALL}>
          <Text typography='labelLarge' className='text-dark mb-0'>
            Všetky úlohy
          </Text>
        </option>

        <option value={OPTION_VALUE.COMPLETED}>
          <Text typography='labelLarge' className='text-dark mb-0'>
            Dokončené úlohy
          </Text>
        </option>

        <option value={OPTION_VALUE.INCOMPLETE}>
          <Text typography='labelLarge' className='text-dark mb-0'>
            Nedokončené úlohy
          </Text>
        </option>
      </select>
    </div>
  );
};
