import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.delete_student';

export default defineMessages({
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Are you sure to delete',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Deleted successfully',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error has occured',
  },
});
