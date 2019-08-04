import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.admin.sidebar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Search pages',
  },
  blog: {
    id: `${scope}.content.blog`,
    defaultMessage: 'Blog',
  },
  regions: {
    id: `${scope}.content.regions`,
    defaultMessage: 'Regions',
  },
  schools: {
    id: `${scope}.content.schools`,
    defaultMessage: 'Schools',
  },
});
