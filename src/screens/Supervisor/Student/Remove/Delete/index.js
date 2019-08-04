import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, message } from 'antd';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import axios from 'axios';

import messages from './messages';
import { IP_ADDRESS } from 'utils/config';

const { confirm } = Modal;

const RemoveButton = styled(Button)`
  background-color: #d60606;
  color: white;
`;

const MyIcon = styled(Icon)`
  font-size: 15px;
`;

const DeleteContent = styled.div`
  margin-top: 20px;
`;

const P = styled.p`
  font-size: 18px;
  margin-bottom: 0px;
`;

const Delete = ({ studentID, forceUpdate, intl }) => {
  const [student, setStudent] = useState({});
  const url = `${IP_ADDRESS}/student/${studentID}`;

  const confirmPlaceholder = intl.formatMessage(messages.confirm);
  const okPlaceholder = intl.formatMessage(messages.yes);
  const noPlaceholder = intl.formatMessage(messages.no);
  const successPlaceholder = intl.formatMessage(messages.success);
  const errorPlaceholder = intl.formatMessage(messages.error);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const {
          data: { result },
        } = await axios.get(url);
        setStudent(result);
      } catch (error) {
        console.log('ERR: while fetching student', error);
      }
    };

    fetchStudent();

    //eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    const fullName = `${student.firstName} ${student.lastName}`;
    confirm({
      title: confirmPlaceholder,
      content: (
        <DeleteContent>
          <P>{fullName}</P>
          <P>{student.username}</P>
        </DeleteContent>
      ),
      okText: okPlaceholder,
      okType: 'danger',
      cancelText: noPlaceholder,
      onOk() {
        const deleteStudent = async () => {
          try {
            await axios.delete(url);
            message.success(`${fullName} ${successPlaceholder}`);
            forceUpdate();
          } catch (error) {
            message.error(errorPlaceholder);
            console.log('ERR: while deleting student', error);
          }
        };

        deleteStudent();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <RemoveButton onClick={handleDelete}>
      <MyIcon type="close" />
    </RemoveButton>
  );
};

Delete.propTypes = {
  studentID: PropTypes.string.isRequired,
  forceUpdate: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Delete);
