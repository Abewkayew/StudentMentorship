import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Select } from 'antd';

const { Option } = Select;

const ToggleOption = ({ value, message }) => (
  <Option value={value}>
    {message ? <FormattedMessage {...message} /> : value}
  </Option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
};

export default ToggleOption;
