import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Input, Button, Alert } from 'antd';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { IP_ADDRESS } from 'utils/config';
import { getToken } from 'utils/helpers';
import messages from './messages';

const Wrapper = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
`;

const CenterH1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const MyInput = styled(Input)`
  margin-bottom: 25px;
`;

const Notification = styled.div`
  margin-bottom: 30px;
`;

const MyButton = styled(Button)`
  margin-bottom: 30px;
  background-color: rgba(55, 160, 134, 1);
  color: white;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case 'SUCCESS':
      return {
        ...state,
        isRegistered: true,
        isLoading: false,
        hasError: false,
      };
    case 'FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    case 'NEW':
      return {
        ...state,
        isRegistered: false,
        hasError: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AddStudent = ({ intl }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [register, setRegister] = useState(false);
  const [region, setRegion] = useState('');
  const [requestData, dispatch] = useReducer(reducer, {
    isLoading: false,
    hasError: false,
    isRegistered: false,
  });

  const handleAdd = () => {
    setRegister(true);
  };

  const isAllFieldsCorrect = () => {
    return firstName !== '' && lastName !== '' && school !== '';
  };

  const clearAllFields = () => {
    setFirstName('');
    setLastName('');
    setSchool('');
    setRegion('');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (register && isAllFieldsCorrect()) {
        const payload = {
          firstName,
          lastName,
          school,
          region,
          supervisorID: jwt_decode(getToken()).userId,
        };

        dispatch({ type: 'INIT' });
        try {
          await axios.post(`${IP_ADDRESS}/student`, payload);
          dispatch({ type: 'SUCCESS' });
          clearAllFields();
        } catch (err) {
          console.log('ERR: ', err);
          dispatch({ type: 'FAILURE' });
        }

        setRegister(false);
      }
      setRegister(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, [register]);

  const { isRegistered, hasError } = requestData;

  useEffect(() => {
    let timeout = null;
    if (isRegistered) {
      timeout = setTimeout(() => dispatch({ type: 'NEW' }), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isRegistered]);

  useEffect(() => {
    let timeout = null;
    if (hasError) {
      timeout = setTimeout(() => dispatch({ type: 'NEW' }), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hasError]);

  const firstNamePlaceholder = intl.formatMessage(messages.firstName);
  const lastNamePlaceholder = intl.formatMessage(messages.lastName);
  const regionAreaPlaceholder = intl.formatMessage(messages.regionArea);
  const schoolPlaceholder = intl.formatMessage(messages.school);

  const { isLoading } = requestData;

  return (
    <Wrapper>
      <CenterH1>
        <FormattedMessage {...messages.add} />
      </CenterH1>
      {isRegistered && (
        <Notification>
          <Alert
            type="success"
            message={<FormattedMessage {...messages.success} />}
            showIcon
          />
        </Notification>
      )}
      {hasError && (
        <Notification>
          <Alert
            type="error"
            message={<FormattedMessage {...messages.error} />}
            showIcon
          />
        </Notification>
      )}
      <MyInput
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder={firstNamePlaceholder}
      />
      <MyInput
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder={lastNamePlaceholder}
      />
      <MyInput
        value={region}
        onChange={e => setRegion(e.target.value)}
        placeholder={regionAreaPlaceholder}
      />
      <MyInput
        value={school}
        onChange={e => setSchool(e.target.value)}
        placeholder={schoolPlaceholder}
      />
      <MyButton
        loading={isLoading}
        onClick={handleAdd}
        block
        icon="save"
        size="large"
      >
        <FormattedMessage {...messages.add} />
      </MyButton>
    </Wrapper>
  );
};

AddStudent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AddStudent);
