import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.sidebar';

export default defineMessages({
  add: {
    id: `${scope}.content.add_student`,
    defaultMessage: 'Add Student',
  },
  import: {
    id: `${scope}.content.import_student`,
    defaultMessage: 'Import Student',
  },
  remove: {
    id: `${scope}.content.remove_student`,
    defaultMessage: 'Remove Student',
  },
  logout: {
    id: `pharma.student_management.logout`,
    defaultMessage: 'Log out',
  },
});
