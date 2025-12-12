import { UserRole } from '@/context/RoleContext';

export type AuthStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  StudentLogin: undefined;
  ProfessorEmployeeLogin: { role: Extract<UserRole, 'professor' | 'employee'> };
  DashboardPlaceholder: { role: UserRole };
};

