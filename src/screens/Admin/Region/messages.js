import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.admin.regions';

export default defineMessages({
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search...',
  },
  add: {
    id: `${scope}.addregion`,
    defaultMessage: 'Add Region',
  },
  country: {
    id: `${scope}.country`,
    defaultMessage: 'Country',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
});
