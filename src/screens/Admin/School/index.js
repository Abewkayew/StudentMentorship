import React from 'react';
import styled from 'styled-components';
import { Button, Select } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import messages from './messages';
import Flex from 'components/Flex';
import MyInput from 'components/Input';
import MySelect from 'components/Select';

import Schools from './Schools';

function handleChange(value) {
  console.log(`selected ${value}`);
}

const { Option } = Select;

const HeaderWrapper = styled(Flex)`
  margin-bottom: 20px;
`;

const MyButton = styled(Button)`
  padding: 0px 30px;
  background-color: rgba(55, 160, 134, 1);
  color: white;
`;

const Item = styled.div``;

const MySpan = styled.span`
  color: rgba(0, 0, 0, 0.65);
  display: block;
  margin-bottom: 10px;
`;

const School = ({ intl }) => {
  const schoolPlaceholder = intl.formatMessage(messages.school);
  return (
    <>
      <HeaderWrapper justifyContent="space-between" alignItems="center">
        <Item>
          <MySpan>
            <FormattedMessage {...messages.region} />
          </MySpan>
          <MySelect
            defaultValue="lucy"
            style={{ width: 180 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </MySelect>
        </Item>
        <Item>
          <MySpan>
            <FormattedMessage {...messages.school} />
          </MySpan>
          <MyInput placeholder={schoolPlaceholder} />
        </Item>
        <MyButton size="large" icon="plus">
          <FormattedMessage {...messages.add} />
        </MyButton>
      </HeaderWrapper>
      <Schools />
    </>
  );
};

School.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(School);
