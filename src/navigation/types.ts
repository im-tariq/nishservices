import { UserRole } from '@/context/RoleContext';

export type TabParamList = {
  Home: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  StudentLogin: undefined;
  DepartmentSelection: undefined;
  ProfessorEmployeeLogin: { role: 'professor' } | { role: 'employee'; department: string };
  Dashboard: { role: UserRole };
  QueueService: undefined;
  NoteHubService: undefined;
  MentorService: undefined;
  CourseReviewService: undefined;
  UniversityInfoService: undefined;
  EventsService: undefined;
};

export type EventsStackParamList = {
  EventsHome: undefined;
  EventDetail: { eventId: string; title: string };
};
