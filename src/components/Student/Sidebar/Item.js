import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Flex';

const Wrapper = styled(Flex)`
  margin-bottom: 15px;
`;

const Item = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Item;
