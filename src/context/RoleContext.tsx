import React, { createContext, useContext, useMemo, useState } from 'react';

export type UserRole = 'student' | 'professor' | 'employee';

type RoleContextValue = {
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  department: string | null;
  setDepartment: (dept: string | null) => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export const RoleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [department, setDepartment] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      selectedRole,
      setSelectedRole,
      department,
      setDepartment,
    }),
    [selectedRole, department],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

