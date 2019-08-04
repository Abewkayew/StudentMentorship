import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.sidebar';

export default defineMessages({
  search: {
    id: `${scope}.header`,
    defaultMessage: 'Search Pages',
  },
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
  profile: {
    id: `${scope}.content.profile`,
    defaultMessage: 'Profile',
  },
});
