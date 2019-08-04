import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import CenterFlex from 'components/CenterFlex';

const TableWrapper = styled.div`
  margin-top: 30px;
`;
const columns = [
  {
    title: '#',
    dataIndex: 'number',
  },
  {
    title: <FormattedMessage {...messages.subRegion} />,
    dataIndex: 'subregion',
  },
  {
    title: <FormattedMessage {...messages.school} />,
    dataIndex: 'school',
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
    subregion: 'Amhara',
    school: 'Fassil',
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
    subregion: 'Somali',
    school: 'jegol',
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
    subregion: 'South',
    school: 'Hadiya',
    remove: (
      <CenterFlex>
        <Button type="danger">
          <FormattedMessage {...messages.delete} />
        </Button>
      </CenterFlex>
    ),
  },
];

class Schools extends React.Component {
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

export default Schools;
