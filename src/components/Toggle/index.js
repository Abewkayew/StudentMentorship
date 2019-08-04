import { Select } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { changeLocale } from 'contexts/Locale/actions';
import { useLocaleValue } from 'contexts/Locale';

const { Option } = Select;

const StyledSelect = styled(Select)`
  margin-right: 10px;
`;

function Toggle(props) {
  let content = <Option>--</Option>;
  const [locale, dispatch] = useLocaleValue();

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <Option key={value} value={value}>
        {props.messages[value] ? (
          <FormattedMessage {...props.messages[value]} />
        ) : (
          value
        )}
      </Option>
    ));
  }

  return (
    <StyledSelect
      value={locale}
      onChange={locale => dispatch(changeLocale(locale))}
    >
      {content}
    </StyledSelect>
  );
}

Toggle.propTypes = {
  onUpdateLocale: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
