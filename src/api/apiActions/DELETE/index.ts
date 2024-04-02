import { apiClient, getErrorMessage } from '@/api';

/**
 * DELETE /tasks/{id}
 * @summary Deletes given task
 * @tags Tasks
 * @param {string} id.path.required - ID of task
 * @return {string} 200 - Successful response
 * @return {string} 422 - Bad request
 * @return {string} 400 - ID of task was not found
 */
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete<void>(`/tasks/${id}`);
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
