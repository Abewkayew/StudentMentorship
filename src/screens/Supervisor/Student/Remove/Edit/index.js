import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, Input, Alert } from 'antd';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import messages from './messages';
import useEdit from 'hooks/Supervisor/Edit';
import { IP_ADDRESS } from 'utils/config';
import { isEmpty } from 'utils/helpers';

const Wrapper = styled.div`
  padding: 10px 25px 25px 25px;
`;

const MyIcon = styled(Icon)`
  font-size: 15px;
`;

const MyButton = styled(Button)`
  margin-top: 15px;
`;

const MyInput = styled(Input)`
  margin-bottom: 5px;
`;

const Item = styled.div`
  margin-bottom: 10px;
`;

const Span = styled.span`
  margin-bottom: 10px;
`;

const Notification = styled.div`
  margin-bottom: 20px;
`;

const Edit = ({ studentID, forceUpdate, intl }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('');
  const [student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [state, setData, setEdit, dispatch] = useEdit(studentID);

  const fristNamePlaceholder = intl.formatMessage(messages.enterFirstName);
  const lastNamePlaceholder = intl.formatMessage(messages.enterLastName);
  const regionPlaceholder = intl.formatMessage(messages.enterRegion);
  const schoolPlaceholder = intl.formatMessage(messages.enterSchool);

  const { isLoading, hasError, isSuccess } = state;

  const handleCancelModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setShowModal(false);
        dispatch({ type: 'RESET' });
        forceUpdate();
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }

    //eslint-disable-next-line
  }, [isSuccess]);

  useEffect(() => {
    const url = `${IP_ADDRESS}/student/${studentID}`;
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

  useEffect(() => {
    if (!isEmpty(student)) {
      const { firstName, lastName, school, region } = student;
      setFirstName(firstName);
      setLastName(lastName);
      setSchool(school);
      setRegion(region);
    }
  }, [student]);

  const allFieldsAreValid = () => {
    return (
      firstName !== '' && lastName !== '' && school !== '' && region !== ''
    );
  };

  const handleEdit = () => {
    if (allFieldsAreValid()) {
      const payload = {
        firstName,
        lastName,
        school,
        region,
      };
      setData(payload);
      setEdit(true);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} type="primary">
        <MyIcon type="edit" />
      </Button>
      <Modal
        onCancel={handleCancelModal}
        footer={null}
        visible={showModal}
        title={<FormattedMessage {...messages.header} />}
      >
        <Wrapper>
          {isSuccess && (
            <Notification>
              <Alert
                showIcon
                type="success"
                message={<FormattedMessage {...messages.success} />}
              />
            </Notification>
          )}
          {hasError && (
            <Notification>
              <Alert
                showIcon
                type="error"
                message={<FormattedMessage {...messages.error} />}
              />
            </Notification>
          )}
          <Item>
            <Span>
              <FormattedMessage {...messages.firstName} />
            </Span>
            <MyInput
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder={fristNamePlaceholder}
            />
          </Item>

          <Item>
            <Span>
              <FormattedMessage {...messages.lastName} />
            </Span>
            <MyInput
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder={lastNamePlaceholder}
            />
          </Item>

          <Item>
            <Span>
              <FormattedMessage {...messages.region} />
            </Span>
            <MyInput
              value={region}
              onChange={e => setRegion(e.target.value)}
              placeholder={regionPlaceholder}
            />
          </Item>

          <Item>
            <Span>
              <FormattedMessage {...messages.school} />
            </Span>
            <MyInput
              value={school}
              onChange={e => setSchool(e.target.value)}
              placeholder={schoolPlaceholder}
            />
          </Item>

          <MyButton
            loading={isLoading}
            onClick={handleEdit}
            icon="form"
            size="large"
            type="primary"
            block
          >
            <FormattedMessage {...messages.edit} />
          </MyButton>
        </Wrapper>
      </Modal>
    </>
  );
};

Edit.propTypes = {
  studentID: PropTypes.string.isRequired,
  forceUpdate: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(Edit));
