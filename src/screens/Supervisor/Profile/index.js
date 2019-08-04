import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Avatar } from 'antd';
import styled from 'styled-components';

import Flex from 'components/Flex';
import LoadingIndicator from 'components/LoadingIndicator';
import { getToken } from 'utils/helpers';
import { IP_ADDRESS } from 'utils/config';

const StyledAvatar = styled(Avatar)`
  margin-right: 20px;
`;

const H1 = styled.h1`
  margin-bottom: 0px;
`;

const H2 = styled.h2`
  margin-bottom: 0px;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'SUCCESS':
      return {
        ...state,
        isError: false,
        isLoading: false,
        result: action.result,
      };
    case 'FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

const Profile = () => {
  const [state, dispatch] = useReducer(reducer, {
    result: {},
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'INIT' });
      try {
        const { userId: supervisorID } = jwt_decode(getToken());
        const url = `${IP_ADDRESS}/supervisor/${supervisorID}`;
        const {
          data: { result },
        } = await axios.get(url);
        dispatch({ type: 'SUCCESS', result });
      } catch (err) {
        dispatch({ type: 'FAILURE' });
      }
    };

    fetchData();
  }, []);

  const { isLoading } = state;
  if (isLoading) return <LoadingIndicator />;

  const { firstName, lastName, email } = state.result;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Flex justifyContent="center" alignItems="center">
      <StyledAvatar size={64} icon="user" />
      <div>
        <H1>{fullName || ''}</H1>
        <H2>{email}</H2>
      </div>
    </Flex>
  );
};

export default Profile;
