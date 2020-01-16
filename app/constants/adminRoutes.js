/* eslint-disable */
import routes  from 'constants/routes.json';

export const adminRoutes = [
  {
    as: 'Link',
    content: 'Dashboard',
    key: 'dashboard',
    to: routes.HOME,
    icon: 'table',
  },
  {
    as: 'Link',
    content: 'Dashboard',
    key: 'leads',
    to: routes.LEADS,
    icon: 'table',
  },
  {
    as: 'Link',
    content: 'Client Communication',
    key: 'client-communication',
    to: routes.COMMUNICATION,
    icon: 'user outline'
  },
  {
    as: 'Link',
    content: 'Notifications',
    key: 'notifications',
    to: routes.NOTIFICATIONS,
    icon: 'bell outline'
  },
  {
    as: 'Link',
    content: 'Appointments',
    key: 'appointments',
    to: routes.APPOINTMENTS,
    icon: 'calendar alternate outline'
  },
  {
    as: 'Link',
    content: 'Email',
    key: 'email',
    to: routes.EMAIL,
    icon: 'mail'
  },
  {
    as: 'Link',
    content: 'Data',
    key: 'data',
    to: routes.DATA,
    icon: 'database'
  },
  {
    as: 'Link',
    content: 'Employee Chat',
    key: 'employee-chat',
    to: routes.CHAT,
    icon: 'comment outline'
  },
  {
    as: 'Link',
    content: 'Settings',
    key: 'settings',
    to: routes.SETTINGS,
    icon: 'settings'
  }
];
