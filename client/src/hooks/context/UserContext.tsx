import React, {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUserAPIClient } from '@/api/UsersAPIClient';
import { useErrorMessageHandler } from '@/hooks/useErrorMessageHandler';
import { User } from '@/components/Dashboard/types';

interface UsersContextType {
  users: User[] | undefined;
  isLoading: boolean;
  getUsers: () => Promise<void>;
  reloadUsers: () => void;
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(false);
  const usersAPIClient = useUserAPIClient();
  const { errorMessageHandler } = useErrorMessageHandler();

  const getUsers = async () => {
    setIsLoading(true);
    const res = await usersAPIClient.list();

    if (res.hasError) {
      errorMessageHandler(res);
      setIsLoading(false);
      return;
    }

    setUsers(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const reloadUsers = () => {
    getUsers();
  };

  return (
    <UsersContext.Provider value={{ users, isLoading, getUsers, reloadUsers, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
};
