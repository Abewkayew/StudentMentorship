import { defineMessages } from 'react-intl';

export const scope =
  'pharma.student_management.supervisor.remove_student.table.column';

export default defineMessages({
  remove: {
    id: `pharma.student_management.supervisor.sidebar.content.remove_student`,
    defaultMessage: 'Import Student',
  },
  firstName: {
    id: `${scope}.first_name`,
    defaultMessage: 'First Name',
  },
  lastName: {
    id: `${scope}.last_name`,
    defaultMessage: 'Last Name',
  },
  regionArea: {
    id: `${scope}.region_area`,
    defaultMessage: 'Region | Area',
  },
  school: {
    id: `${scope}.school`,
    defaultMessage: 'School',
  },
  credential: {
    id: `${scope}.credential`,
    defaultMessage: 'Credential',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  showCredential: {
    id: `${scope}.show_credential`,
    defaultMessage: 'Show Credential',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
});
