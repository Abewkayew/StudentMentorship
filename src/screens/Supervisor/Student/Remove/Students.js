import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Button, Icon, Modal, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { getToken } from 'utils/helpers';
import { IP_ADDRESS } from 'utils/config';
import messages from './messages';
import CenterFlex from 'components/CenterFlex';
import Delete from './Delete';
import Edit from './Edit';

const MyIcon = styled(Icon)`
  font-size: 15px;
`;

const TableWrapper = styled.div`
  margin-top: 30px;
`;

const CenterH2 = styled.h2`
  text-align: center;
  margin-bottom: 25px;
`;

const StyledH3 = styled.h3`
  margin-bottom: 0px;
`;

const StyledSpan = styled.span`
  margin-left: 10px;
`;

const columns = [
  {
    title: <FormattedMessage {...messages.firstName} />,
    dataIndex: 'firstName',
  },
  {
    title: <FormattedMessage {...messages.lastName} />,
    dataIndex: 'lastName',
  },
  {
    title: <FormattedMessage {...messages.regionArea} />,
    dataIndex: 'region',
  },
  {
    title: <FormattedMessage {...messages.school} />,
    dataIndex: 'school',
  },
  {
    title: <FormattedMessage {...messages.credential} />,
    dataIndex: 'credential',
  },
  {
    title: <FormattedMessage {...messages.edit} />,
    dataIndex: 'edit',
  },
  {
    title: <FormattedMessage {...messages.delete} />,
    dataIndex: 'delete',
  },
];

const Students = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showDialog, setShowDialog] = useState(false);

  const handleCancel = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { userId: supervisorID } = jwt_decode(getToken());
      const url = `${IP_ADDRESS}/supervisor/students/${supervisorID}`;
      const { data } = await axios.get(url);
      const structuredData = data.map((student, index) => {
        return {
          key: index + 1,
          firstName: student.firstName,
          lastName: student.lastName,
          region: student.region,
          school: student.school,
          credential: (
            <CenterFlex>
              <Tooltip
                placement="top"
                title={<FormattedMessage {...messages.showCredential} />}
              >
                <Button
                  onClick={() => {
                    const studentCredential = {
                      username: student.username,
                      password: student.password,
                      fullname: `${student.firstName} ${student.lastName}`,
                    };
                    setSelectedStudent({ ...studentCredential });
                    setShowDialog(true);
                  }}
                >
                  <MyIcon type="lock" />
                </Button>
              </Tooltip>
            </CenterFlex>
          ),
          edit: (
            <CenterFlex>
              <Edit
                studentID={student._id}
                forceUpdate={() => setRefresh(!refresh)}
              />
            </CenterFlex>
          ),
          delete: (
            <CenterFlex>
              <Delete
                studentID={student._id}
                forceUpdate={() => setRefresh(!refresh)}
              />
            </CenterFlex>
          ),
        };
      });

      setData(structuredData);
    };

    fetchData();

    //eslint-disable-next-line
  }, [refresh]);

  return (
    <>
      <TableWrapper>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      </TableWrapper>
      <Modal
        title={
          <StyledH3>
            <FormattedMessage {...messages.credential} />
          </StyledH3>
        }
        visible={showDialog}
        onCancel={handleCancel}
        footer={null}
      >
        <CenterH2>{selectedStudent.fullname}</CenterH2>
        <h3>
          <FormattedMessage {...messages.username} />:
          <StyledSpan>{selectedStudent.username}</StyledSpan>
        </h3>
        <h3>
          <FormattedMessage {...messages.password} />:
          <StyledSpan>{selectedStudent.password}</StyledSpan>
        </h3>
      </Modal>
    </>
  );
};

export default Students;
