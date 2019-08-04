import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';

import { IP_ADDRESS } from 'utils/config';
import { saveToken } from 'utils/helpers';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        hasError: false,
      };
    }
    case 'FETCH_FAILURE': {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case 'RESET':
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const useLogin = () => {
  const [payload, setPayload] = useState({});
  const [login, setLogin] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isSuccess: false,
    hasError: false,
  });

  useEffect(() => {
    const logInFunc = async () => {
      if (login) {
        dispatch({ type: 'FETCH_INIT' });
        const url = `${IP_ADDRESS}/${payload.role}/authenticate_${payload.role}`;
        try {
          const { role, ...rest } = payload;
          const {
            data: { token },
          } = await axios.post(url, rest);
          dispatch({ type: 'FETCH_SUCCESS' });
          saveToken(token);
          setLogin(false);
        } catch (err) {
          dispatch({ type: 'FETCH_FAILURE' });
          setLogin(false);
        }
      }
    };

    logInFunc();
    //eslint-disable-next-line
  }, [login]);

  return [state, setLogin, setPayload, dispatch];
};

export default useLogin;
