import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.admin.schools';

export default defineMessages({
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  school: {
    id: `${scope}.school`,
    defaultMessage: 'School',
  },
  add: {
    id: `${scope}.addschool`,
    defaultMessage: 'Add School',
  },
  subRegion: {
    id: `${scope}.sub_region`,
    defaultMessage: 'Sub Region',
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
