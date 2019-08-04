import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import { IP_ADDRESS } from 'utils/config';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isSuccess: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        hasError: false,
      };

    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};

const useImportStudens = () => {
  const [importStudent, setImportStudent] = useState(false);
  const [students, setStudents] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isSuccess: false,
    hasError: false,
  });

  useEffect(() => {
    const importFunc = async () => {
      if (importStudent) {
        const url = `${IP_ADDRESS}/student`;

        dispatch({ type: 'FETCH_INIT' });
        try {
          const axiosRequests = students.map(student => {
            return axios.post(url, student);
          });

          await axios.all(axiosRequests);
          dispatch({ type: 'FETCH_SUCCESS' });
          setImportStudent(false);
        } catch (error) {
          dispatch({ type: 'FETCH_FAILURE' });
          setImportStudent(false);
        }
      }
    };

    importFunc();
    //eslint-disable-next-line
  }, [importStudent]);

  return [state, setImportStudent, setStudents];
};

export default useImportStudens;
