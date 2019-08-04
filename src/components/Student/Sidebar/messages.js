import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.admin.sidebar';
export const scope1 = 'pharma.student_management.student';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Search pages',
  },
  blogs: {
    id: `${scope1}.blogs`,
    defaultMessage: 'Blogs',
  },
});
