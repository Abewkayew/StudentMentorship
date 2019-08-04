import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Students from './Students';

const H1 = styled.h1`
  margin-bottom: 50px;
  font-weight: bold;
`;

const RemoveStudent = () => {
  return (
    <>
      <H1>
        <FormattedMessage {...messages.remove} />
      </H1>
      <Students />
    </>
  );
};

export default RemoveStudent;
