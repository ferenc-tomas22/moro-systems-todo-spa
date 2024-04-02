import { apiClient, getErrorMessage } from '@/api';
import { ITask } from '@/model';

/**
 * POST /tasks
 * @summary Creates task with given text, then returns created task
 * @tags Tasks
 * @param {CreateTask} request.body.required - text
 * @return {ITask} 200 - Successful response - application/json
 * @return {string} 422 - Bad request response
 */
export const createTask = async (text: string): Promise<ITask> => {
  try {
    const { data } = await apiClient.post<ITask>('/tasks', { text });
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * POST /tasks/{id}
 * @summary Updates text of given task, then returns modified task
 * @tags Tasks
 * @param {string} id.path.required - ID of task
 * @param {UpdateTask} request.body.required - text
 * @return {ITask} 200 - Successful response - application/json
 * @return {string} 422 - Bad request
 */
export const updateTask = async (id: string, text: string): Promise<ITask> => {
  try {
    const { data } = await apiClient.post<ITask>(`/tasks/${id}`, { text });
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * POST /tasks/{id}/complete
 * @summary Completes given task, then returns modified task
 * @tags Tasks
 * @param {string} id.path.required - ID of task
 * @return {ITask} 200 - Successful response - application/json
 * @return {string} 422 - Bad request
 * @return {string} 400 - ID of task was not found
 */
export const completeTask = async (id: string): Promise<ITask> => {
  try {
    const { data } = await apiClient.post<ITask>(`/tasks/${id}/complete`);
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * POST /tasks/{id}/incomplete
 * @summary Incompletes given task, then returns modified task
 * @tags Tasks
 * @param {string} id.path.required - ID of task
 * @return {ITask} 200 - Successful response - application/json
 * @return {string} 422 - Bad request
 * @return {string} 400 - ID of task was not found
 */
export const incompleteTask = async (id: string): Promise<ITask> => {
  try {
    const { data } = await apiClient.post<ITask>(`/tasks/${id}/incomplete`);
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
