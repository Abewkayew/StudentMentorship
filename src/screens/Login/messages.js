import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.signin';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign In',
  },
  role: {
    id: `${scope}.role`,
    defaultMessage: 'Select a role',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'User name',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot username or password',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'SIGN IN',
  },
  admin: {
    id: `${scope}.select.admin`,
    defaultMessage: 'Admin',
  },
  supervisor: {
    id: `${scope}.select.supervisor`,
    defaultMessage: 'Supervisor',
  },
  teacher: {
    id: `${scope}.select.teacher`,
    defaultMessage: 'Teacher',
  },
  student: {
    id: `${scope}.select.student`,
    defaultMessage: 'Student',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Successfully logged in',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Username or password is not correct',
  },
});
