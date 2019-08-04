import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Upload, message } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import useImportStudents from 'hooks/Supervisor';
import { getToken } from 'utils/helpers';
import messages from './messages';
import Flex from 'components/Flex';

const ChooseFile = styled(Flex)`
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  width: 350px;
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-weight: bold;
  margin-bottom: 30px;
`;

const P = styled.p`
  margin-bottom: 0px;
  font-size: 14px;
`;

const MyButton = styled(Button)`
  background-color: rgba(55, 160, 134, 1);
  color: white;
`;

const props = {
  accept:
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
};

const ImportStudent = ({ history, intl }) => {
  const [data, setData] = useState('');
  const [state, setImportStudent, setStudents] = useImportStudents();

  const { isLoading, isSuccess, hasError } = state;

  const chooseSuccess = intl.formatMessage(messages.chooseSuccess);
  const importSuccess = intl.formatMessage(messages.importSuccess);
  const importError = intl.formatMessage(messages.importError);

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(
        () => history.push('/supervisor/managestudent'),
        1000,
      );
      message.success(importSuccess, 1);

      return () => {
        clearTimeout(timeout);
      };
    }

    //eslint-disable-next-line
  }, [isSuccess]);

  useEffect(() => {
    if (hasError) message.error(importError);
    //eslint-disable-next-line
  }, [hasError]);

  const formatStudents = (students, supervisorID) => {
    let structuredStudents = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i].split(',');
      const [firstName, lastName, region, school] = student;
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        region: region.trim(),
        school: school.trim(),
        supervisorID,
      };

      structuredStudents.push(payload);
    }

    return structuredStudents;
  };

  const handleImport = async () => {
    const { userId: supervisorID } = jwt_decode(getToken());
    const [, ...students] = data.split('\n');
    const structuredStudents = formatStudents(students, supervisorID);
    setStudents(structuredStudents);
    setImportStudent(true);
  };

  return (
    <Wrapper>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <ChooseFile justifyContent="space-between" alignItems="center">
        <Upload
          {...props}
          onChange={info => {
            const func = async () => {
              if (info.file.status !== 'uploading') {
                let reader = new FileReader();
                reader.onload = e => {
                  setData(reader.result);
                };
                await reader.readAsText(info.file.originFileObj);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} ${chooseSuccess}`, 1);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            };

            func();
          }}
        >
          <Button icon="upload">
            <FormattedMessage {...messages.chooseFile} />
          </Button>
        </Upload>
        {data === '' && (
          <P>
            <FormattedMessage {...messages.noFileChoose} />
          </P>
        )}
      </ChooseFile>
      <MyButton
        loading={isLoading}
        onClick={handleImport}
        size="large"
        block
        icon="import"
      >
        <FormattedMessage {...messages.import} />
      </MyButton>
    </Wrapper>
  );
};

ImportStudent.propTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(ImportStudent));
