import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getErrorMessage, getTasks } from '@/api';
import { useToast } from '@/context';
import { noop } from '@/helpers';
import { ITask } from '@/model';
import { FCC } from '@/types';

export type IAppContext = {
  setTasks: (tasks: ITask[]) => void;
  updateTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  addTask: (task: ITask) => void;
  tasks: ITask[];
};

export const initAppContext: IAppContext = {
  updateTask: noop,
  deleteTask: noop,
  setTasks: noop,
  addTask: noop,
  tasks: [],
};

const AppContext = createContext<IAppContext>(initAppContext);

export const AppContextProvider: FCC = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { showPromiseToast } = useToast();

  useEffect(() => {
    showPromiseToast({
      loading: 'Načítavam tvoje úlohy',
      success: 'Úlohy boli načítané',
      error: getErrorMessage,
      promise: async () => {
        setTasks(await getTasks());
      },
    });
  }, [showPromiseToast]);

  const value = useMemo(
    () => ({
      tasks,
      setTasks,
      addTask: (task: ITask) => setTasks((prev) => [task, ...prev]),
      updateTask: (task: ITask) =>
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t))),
      deleteTask: (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id)),
    }),
    [tasks]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
