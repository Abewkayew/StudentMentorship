import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.edit_student';

export default defineMessages({
  header: {
    id: `${scope}.edit_student`,
    defaultMessage: 'Edit a student',
  },
  firstName: {
    id: `${scope}.first_name`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.last_name`,
    defaultMessage: 'Last name',
  },
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  school: {
    id: `${scope}.school`,
    defaultMessage: 'School',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  enterFirstName: {
    id: `${scope}.enter.first_name`,
    defaultMessage: 'Enter first name',
  },
  enterLastName: {
    id: `${scope}.enter.last_name`,
    defaultMessage: 'Enter last name',
  },
  enterRegion: {
    id: `${scope}.enter.region`,
    defaultMessage: 'Enter Region',
  },
  enterSchool: {
    id: `${scope}.enter.school`,
    defaultMessage: 'Enter School',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Student successfully edited',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error has occured',
  },
});
