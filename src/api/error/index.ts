import { isAxiosError } from 'axios';

export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error) || error instanceof Error) {
    return error.message;
  }

  return String(error);
};
