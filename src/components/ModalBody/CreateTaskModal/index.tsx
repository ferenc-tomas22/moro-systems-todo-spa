import { useState } from 'react';

import { Text } from '@/components';
import { useApi, useModal, useToast } from '@/context';
import { useWatchEnterKey } from '@/hooks';

export const CreateTaskModal = () => {
  const [text, setText] = useState('');

  const { showToast } = useToast();
  const { hideModal } = useModal();
  const { createTask } = useApi();

  const handleCreateTask = () => {
    if (!text) {
      showToast('Text úlohy nesmie byť prázdny', 'error');
      return;
    }

    createTask(text);
    hideModal();
  };

  useWatchEnterKey(handleCreateTask);

  return (
    <>
      <div className='modal-body'>
        <div className='form-floating mb-2'>
          <input
            type='text'
            value={text}
            placeholder='Text úlohy'
            id='floating-task-text-input'
            className='form-control shadow-sm'
            onChange={({ target: { value } }) => setText(value)}
          />

          <label htmlFor='floating-task-text-input'>
            <Text typography='labelRegular' className='mb-0'>
              Text úlohy
            </Text>
          </label>
        </div>
      </div>

      <div className='modal-footer justify-content-center'>
        <button type='button' className='btn btn-primary w-100' onClick={handleCreateTask}>
          <Text typography='labelLarge' className='mb-0'>
            Pridať úlohu
          </Text>
        </button>
      </div>
    </>
  );
};
