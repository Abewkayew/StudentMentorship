import styled from 'styled-components';
import { Input } from 'antd';

export default styled(Input)`
  border: 0px;
  border-bottom: 1px solid #e4e6e8;
  border-radius: 0px;

  .ant-input:focus {
    box-shadow: none !important;
  }
`;
