import React, { createContext, useContext, useState } from 'react';

import { User } from '../api/type';

type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const userState = useState<User | null>(null);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  const userState = useContext(UserContext);

  if (!userState) {
    throw new Error('UserContext is not used');
  }

  return userState;
}
