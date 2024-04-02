import { createContext, useContext } from 'react';

import { useApiActions } from '@/hooks';
import { FCC } from '@/types';

type IApiActions = ReturnType<typeof useApiActions>;

const initApiContext: IApiActions = {} as IApiActions;

const ApiContext = createContext(initApiContext);

export const ApiProvider: FCC = ({ children }) => (
  <ApiContext.Provider value={useApiActions()}>{children}</ApiContext.Provider>
);

export const useApi = () => useContext(ApiContext);
