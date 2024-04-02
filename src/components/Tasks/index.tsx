import React from 'react';

import { Task, Text } from '@/components';
import { useApp } from '@/context';

export const Tasks = () => {
  const { tasks } = useApp();

  if (!tasks.length) {
    return (
      <div role='alert' className='alert alert-secondary shadow-sm mt-5'>
        <Text typography='labelRegular' className='text-dark text-center mb-0'>
          Žiadne úlohy
        </Text>
      </div>
    );
  }

  return tasks
    .toSorted((a, b) => b.createdDate - a.createdDate)
    .map((task, index) => (
      <React.Fragment key={task.id}>
        <Task task={task} position={index + 1} />
      </React.Fragment>
    ));
};
