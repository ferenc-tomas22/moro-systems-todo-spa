import { apiClient, getErrorMessage } from '@/api';
import { ITask } from '@/model';

/**
 * GET /tasks
 * @summary Returns all tasks. Slow service, around 3 seconds
 * @tags Tasks
 * @return {array<ITask>} 200 - Successful response - application/json
 */
export const getTasks = async (): Promise<ITask[]> => {
  try {
    const { data } = await apiClient.get<ITask[]>('/tasks');
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * GET /tasks/completed
 * @summary Returns all completed tasks
 * @tags Tasks
 * @return {array<ITask>} 200 - Successful response - application/json
 */
export const getCompletedTasks = async (): Promise<ITask[]> => {
  try {
    const { data } = await apiClient.get<ITask[]>('/tasks/completed');
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
