import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import messages from './messages';
import Flex from 'components/Flex';
import Regions from './Regions';
import MyInput from 'components/Input';

const MyButton = styled(Button)`
  width: 45%;
  background-color: rgba(55, 160, 134, 1);
  color: white;
`;

const SearchWrapper = styled.div`
  width: 45%;
`;

const Region = ({ intl }) => {
  const searchPlaceholder = intl.formatMessage(messages.search);
  return (
    <>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <SearchWrapper>
          <span>
            <FormattedMessage {...messages.region} />
          </span>
          <MyInput placeholder={searchPlaceholder} />
        </SearchWrapper>
        <MyButton icon="plus" size="large">
          <FormattedMessage {...messages.add} />
        </MyButton>
      </Flex>
      <Regions />
    </>
  );
};

Region.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Region);
