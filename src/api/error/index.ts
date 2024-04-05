import { isAxiosError } from 'axios';

export const getErrorMessage = (caughtError: unknown) => {
  if (isAxiosError(caughtError) || caughtError instanceof Error) {
    return caughtError.message;
  }

  return String(caughtError);
};
