import { useCallback, useMemo } from 'react';

import {
  completeTask as apiCompleteTask,
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  getCompletedTasks as apiGetCompletedTasks,
  getErrorMessage,
  getTasks as apiGetTasks,
  incompleteTask as apiIncompleteTask,
  updateTask as apiUpdateTask,
} from '@/api';
import { useApp, useToast } from '@/context';

export const useApiActions = () => {
  const { showPromiseToast } = useToast();
  const { setTasks, addTask, updateTask, deleteTask } = useApp();

  const getTasksAction = useCallback(
    () =>
      showPromiseToast({
        loading: 'Načítavam úlohy',
        success: 'Úlohy boli načítané',
        error: getErrorMessage,
        promise: async () => {
          setTasks(await apiGetTasks());
        },
      }),
    [setTasks, showPromiseToast]
  );

  const getCompletedTasksAction = useCallback(
    () =>
      showPromiseToast({
        loading: 'Načítavam dokončené úlohy',
        success: 'Úlohy boli načítané',
        error: getErrorMessage,
        promise: async () => {
          setTasks(await apiGetCompletedTasks());
        },
      }),
    [setTasks, showPromiseToast]
  );

  const getIncompleteTasksAction = useCallback(
    () =>
      showPromiseToast({
        loading: 'Načítavam nedokončené úlohy',
        success: 'Úlohy boli načítané',
        error: getErrorMessage,
        promise: async () => {
          setTasks((await apiGetTasks()).filter(({ completed }) => !completed));
        },
      }),
    [setTasks, showPromiseToast]
  );

  const setTasks2CompletedAction = useCallback(
    () =>
      showPromiseToast({
        loading: 'Označujem všetky úlohy ako dokončené',
        success: 'Úlohy boli označené ako dokončené',
        error: getErrorMessage,
        promise: async () => {
          setTasks((await apiGetTasks()).map((t) => ({ ...t, completed: true })));
        },
      }),
    [setTasks, showPromiseToast]
  );

  const createTaskAction = useCallback(
    (text: string) =>
      showPromiseToast({
        loading: 'Vytváram úlohu',
        success: 'Úloha bola vytvorená',
        error: getErrorMessage,
        promise: async () => {
          addTask(await apiCreateTask(text));
        },
      }),
    [addTask, showPromiseToast]
  );

  const updateTaskAction = useCallback(
    (id: string, text: string) =>
      showPromiseToast({
        loading: 'Ukladám úlohu',
        success: 'Úloha bola uložená',
        error: getErrorMessage,
        promise: async () => {
          updateTask(await apiUpdateTask(id, text));
        },
      }),
    [updateTask, showPromiseToast]
  );

  const updateTaskStatusAction = useCallback(
    (id: string, completed: boolean) =>
      showPromiseToast({
        loading: 'Ukladám úlohu',
        success: 'Úloha bola uložená',
        error: getErrorMessage,
        promise: async () => {
          updateTask(await (completed ? apiCompleteTask(id) : apiIncompleteTask(id)));
        },
      }),
    [updateTask, showPromiseToast]
  );

  const deleteTaskAction = useCallback(
    (id: string) =>
      showPromiseToast({
        loading: 'Mažem úlohu',
        success: 'Úloha bola zmazaná',
        error: getErrorMessage,
        promise: async () => {
          await apiDeleteTask(id);
          deleteTask(id);
        },
      }),
    [deleteTask, showPromiseToast]
  );

  const deleteCompletedTasksAction = useCallback(
    () =>
      showPromiseToast({
        loading: 'Mažem dokončené úlohy',
        success: 'Dokončené úlohy boli zmazané',
        error: getErrorMessage,
        promise: async () => {
          await Promise.all((await apiGetCompletedTasks()).map(({ id }) => apiDeleteTask(id)));
          setTasks(await apiGetTasks());
        },
      }),
    [setTasks, showPromiseToast]
  );

  return useMemo(
    () => ({
      getTasks: getTasksAction,
      getCompletedTasks: getCompletedTasksAction,
      getIncompleteTasks: getIncompleteTasksAction,

      setTasks2Completed: setTasks2CompletedAction,

      createTask: createTaskAction,

      updateTask: updateTaskAction,
      updateTaskStatus: updateTaskStatusAction,

      deleteTask: deleteTaskAction,
      deleteCompletedTasks: deleteCompletedTasksAction,
    }),
    [
      getTasksAction,
      getCompletedTasksAction,
      getIncompleteTasksAction,

      setTasks2CompletedAction,

      createTaskAction,

      updateTaskAction,
      updateTaskStatusAction,

      deleteTaskAction,
      deleteCompletedTasksAction,
    ]
  );
};
