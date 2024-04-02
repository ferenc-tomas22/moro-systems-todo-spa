import React from 'react';

import { Task } from '@/components';
import { useApp } from '@/context';

export const Tasks = () => {
  const { tasks } = useApp();

  return tasks
    .toSorted((a, b) => b.createdDate - a.createdDate)
    .map((task, index) => (
      <React.Fragment key={task.id}>
        <Task task={task} position={index + 1} />
      </React.Fragment>
    ));
};
