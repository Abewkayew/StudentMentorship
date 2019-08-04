import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.teacher';

export default defineMessages({
  success: {
    id: `${scope}.blog.success`,
    defaultMessage: 'Blog successfully added',
  },
  error: {
    id: `${scope}.blog.error`,
    defaultMessage: 'Error has occured while adding blog',
  },
  add: {
    id: `${scope}.blog.add`,
    defaultMessage: 'Add Blog',
  },
  title: {
    id: `${scope}.blog.title`,
    defaultMessage: 'Title',
  },
});
