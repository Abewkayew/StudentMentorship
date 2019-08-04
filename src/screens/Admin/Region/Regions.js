import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Flex from 'components/Flex';

const CenterFlex = ({ children }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      {' '}
      {children}
    </Flex>
  );
};

const TableWrapper = styled.div`
  margin-top: 30px;
`;
const columns = [
  {
    title: '#',
    dataIndex: 'number',
  },
  {
    title: <FormattedMessage {...messages.country} />,
    dataIndex: 'country',
  },
  {
    title: <FormattedMessage {...messages.remove} />,
    dataIndex: 'remove',
  },
];

const data = [
  {
    key: '1',
    number: '1',
    country: 'Brown',
    remove: (
      <CenterFlex>
        <Button type="danger">
          <FormattedMessage {...messages.delete} />
        </Button>
      </CenterFlex>
    ),
  },
  {
    key: '2',
    number: '2',
    country: 'Ethiopia',
    remove: (
      <CenterFlex>
        <Button type="danger">
          <FormattedMessage {...messages.delete} />
        </Button>
      </CenterFlex>
    ),
  },
  {
    key: '3',
    number: '3',
    country: 'Japan',
    remove: (
      <CenterFlex>
        <Button type="danger">
          <FormattedMessage {...messages.delete} />
        </Button>
      </CenterFlex>
    ),
  },
];

class Regions extends React.Component {
  render() {
    return (
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </TableWrapper>
    );
  }
}

export default Regions;
