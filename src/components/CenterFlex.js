import React from 'react';
import Flex from './Flex';
import PropTypes from 'prop-types';

const CenterFlex = ({ children }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      {children}
    </Flex>
  );
};

CenterFlex.propTypes = {
  children: PropTypes.node,
};

export default CenterFlex;
