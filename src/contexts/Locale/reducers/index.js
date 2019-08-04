import { CHANGE_LOCALE } from 'contexts/Locale/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
};

export default reducer;
