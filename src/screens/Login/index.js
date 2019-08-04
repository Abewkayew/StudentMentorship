import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Select, Alert } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

import { getToken } from 'utils/helpers';
import useLogin from 'hooks/Login';
import messages from './messages';
import Flex from 'components/Flex';

const Option = Select.Option;

const Wrapper = styled(Flex)`
  height: 100vh;
`;

const Modal = styled.div`
  box-shadow: 0 1px 3px #ccc;
  width: 350px;
  border-radius: 10px;
`;

const Header = styled(Flex)`
  height: 70px;
  background-color: rgba(55, 160, 134, 1);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-bottom: 15px;
`;

const H2 = styled.h2`
  color: white;
  margin-bottom: 0px;
`;

const Content = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
  padding: 20px;
`;

const MyInput = styled(Input)`
  height: 35px;
  border-radius: 20px;
  margin-bottom: 15px;
  background-color: white;
  padding-left: 25px;
`;

const MyButton = styled(Button)`
  height: 35px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: rgba(55, 160, 134, 1);
  color: white;
  width: 100%;

  &:hover {
    background-color: #fff;
  }
`;

const P = styled.p`
  font-size: 15px;
  margin-bottom: 15px;
  text-align: right;
`;

const Heading = styled.div`
  margin-bottom: 30px;
`;

const MySelect = styled(Select)`
  margin-bottom: 20px;
  width: 100%;
`;

const Notification = styled.div`
  margin-bottom: 25px;
`;

const Login = props => {
  const { intl, history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [state, setLogin, setPayload, dispatch] = useLogin(history);

  const usernamePlaceholder = intl.formatMessage(messages.username);
  const passwordPlaceholder = intl.formatMessage(messages.password);

  const redirectTo = page => props.history.push(page);

  const { isLoading, hasError, isSuccess } = state;

  useEffect(() => {
    if (isSuccess || hasError) {
      const timeout = setTimeout(() => dispatch({ type: 'RESET' }), 2500);

      return () => clearTimeout(timeout);
    }
    //eslint-disable-next-line
  }, [isSuccess, hasError]);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      const { role } = jwt_decode(storedToken);
      redirectTo(`/${role}`);
    }
    //eslint-disable-next-line
  }, []);

  const handleLoginClick = () => {
    dispatch({ type: 'RESET' });

    const payload = {
      email,
      password,
      role,
    };

    setPayload(payload);
    setLogin(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        redirectTo(`/${role}`);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
    //eslint-disable-next-line
  }, [isSuccess]);

  return (
    <Wrapper justifyContent="center" alignItems="center">
      <Modal>
        <Header justifyContent="center" alignItems="center">
          <H2>
            <FormattedMessage {...messages.header} />
          </H2>
        </Header>
        <Content>
          <Heading>
            {hasError && (
              <Notification>
                <Alert
                  showIcon
                  type="error"
                  message={<FormattedMessage {...messages.error} />}
                />
              </Notification>
            )}
            {isSuccess && (
              <Notification>
                <Alert
                  showIcon
                  type="success"
                  message={<FormattedMessage {...messages.success} />}
                />
              </Notification>
            )}
            <MySelect
              defaultvalue={role}
              onChange={role => setRole(role)}
              showSearch
              placeholder={<FormattedMessage {...messages.role} />}
            >
              <Option value="admin">
                <FormattedMessage {...messages.admin} />
              </Option>
              <Option value="supervisor">
                <FormattedMessage {...messages.supervisor} />
              </Option>
              <Option value="teacher">
                <FormattedMessage {...messages.teacher} />
              </Option>
              <Option value="student">
                <FormattedMessage {...messages.student} />
              </Option>
            </MySelect>
            <MyInput
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={usernamePlaceholder}
            />
            <MyInput
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder={passwordPlaceholder}
            />
            <P>
              <FormattedMessage {...messages.forgot} />
            </P>
            <MyButton loading={isLoading} onClick={handleLoginClick}>
              <span>
                <FormattedMessage {...messages.submit} />
              </span>
            </MyButton>
          </Heading>
        </Content>
      </Modal>
    </Wrapper>
  );
};

Login.propTypes = {
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(Login));
