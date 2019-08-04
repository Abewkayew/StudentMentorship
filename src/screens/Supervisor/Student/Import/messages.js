import { defineMessages } from 'react-intl';

export const scope = 'pharma.student_management.supervisor.import_student';

export default defineMessages({
  import: {
    id: `pharma.student_management.supervisor.sidebar.content.import_student`,
    defaultMessage: 'Import Student',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Import Student from Excel file',
  },
  chooseFile: {
    id: `${scope}.choose_file`,
    defaultMessage: 'Choose File',
  },
  noFileChoose: {
    id: `${scope}.no_file_choose`,
    defaultMessage: 'No File Choosen',
  },
  chooseSuccess: {
    id: `${scope}.choose_success`,
    defaultMessage: 'Uploaded successfully',
  },
  importSuccess: {
    id: `${scope}.import_success`,
    defaultMessage: 'Students imported successfully',
  },
  importError: {
    id: `${scope}.choose_success`,
    defaultMessage: "Can't import students",
  },
});
