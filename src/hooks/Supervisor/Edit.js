import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import { IP_ADDRESS } from 'utils/config';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isSuccess: false, hasError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isSuccess: true, hasError: false };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isSuccess: false, hasError: true };
    case 'RESET':
      return { ...state, isLoading: false, isSuccess: false, hasError: false };
    default:
      return state;
  }
};

const useEdit = studentID => {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isSuccess: false,
    hasError: false,
  });

  useEffect(() => {
    if (edit) {
      const url = `${IP_ADDRESS}/student/${studentID}`;
      const editRequest = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const {
            data: { result },
          } = await axios.put(url, data);

          console.log('result: ', result);
          dispatch({ type: 'FETCH_SUCCESS' });
          setEdit(false);
        } catch (error) {
          console.log('ERR: ', error);
          dispatch({ type: 'FETCH_FAILURE' });
          setEdit(false);
        }
      };

      editRequest();
    }

    //eslint-disable-next-line
  }, [edit]);

  return [state, setData, setEdit, dispatch];
};

export default useEdit;
