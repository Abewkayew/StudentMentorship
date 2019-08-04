import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.add_student';

export default defineMessages({
  add: {
    id: `pharma.student_management.supervisor.sidebar.content.add_student`,
    defaultMessage: 'Add Student',
  },
  firstName: {
    id: `${scope}.first_name`,
    defaultMessage: 'First Name',
  },
  lastName: {
    id: `${scope}.last_name`,
    defaultMessage: 'Last Name',
  },
  studentId: {
    id: `${scope}.student_id`,
    defaultMessage: 'Student Id',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  regionArea: {
    id: `${scope}.region_area`,
    defaultMessage: 'Region Area',
  },
  school: {
    id: `${scope}.school`,
    defaultMessage: 'School',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Successfully regisetred',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error has occurred while adding student',
  },
});
