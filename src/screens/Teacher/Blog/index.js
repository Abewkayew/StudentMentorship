import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, message } from 'antd';
import ReactSimpleMDE from 'react-simplemde-editor';
import SimpleMDE from 'simplemde';
import axios from 'axios';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import 'easymde/dist/easymde.min.css';

import messages from './messages';
import Flex from 'components/Flex';
import { IP_ADDRESS } from 'utils/config';
import { SIMPLE_EDITOR_LOCAL_KEY } from 'utils/constants';
import { getSavedBlog, getToken } from 'utils/helpers';

const Wrapper = styled.div`
  box-shadow: 0px 0px 10px #ccc;
  padding-bottom: 20px;
`;

const Title = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e4e6e8;
`;

const LargeP = styled.p`
  font-size: 20px;
  margin: 0px;
`;

const MyButton = styled(Button)`
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  background-color: rgba(55, 160, 134, 1);
  color: white;
  width: 90%;

  &:hover {
    background-color: #fff;
  }
`;

const Blog = ({ intl }) => {
  const [blog, setBlog] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addBlog, setAddBlog] = useState(false);
  const id = 1;

  const successPlaceholder = intl.formatMessage(messages.success);
  const errorPlaceholder = intl.formatMessage(messages.error);

  useEffect(() => {
    setBlog(getSavedBlog(`${SIMPLE_EDITOR_LOCAL_KEY}${id}`) || '');
  }, []);

  useEffect(() => {
    const postBlog = async () => {
      if (addBlog) {
        setIsLoading(true);
        const url = `${IP_ADDRESS}/teacher/blog`;
        const { name, email } = jwt_decode(getToken());
        const payload = {
          date: moment().format('DD/MM/YYYY'),
          blog: convertMDtoHTML(blog),
          blogger: `${name} (${email})`,
        };

        try {
          const { data } = await axios.post(url, payload);
          message.success(successPlaceholder);
          console.log('data: ', data);
          setIsLoading(false);
          setAddBlog(false);
        } catch (err) {
          message.error(errorPlaceholder);
          console.log('ERR: ', err);
          setIsLoading(false);
        }
      }
    };

    postBlog();
    // eslint-disable-next-line
  }, [addBlog]);

  const convertMDtoHTML = blog => SimpleMDE.prototype.markdown(blog);

  return (
    <Wrapper>
      <Title>
        <LargeP>
          <FormattedMessage {...messages.title} />
        </LargeP>
      </Title>
      <ReactSimpleMDE
        value={blog}
        onChange={value => setBlog(value)}
        options={{
          autosave: {
            enabled: true,
            uniqueId: id,
            delay: 1000,
          },
          hideIcons: ['guide'],
          placeholder: 'Type here...',
        }}
      />
      <Flex justifyContent="center">
        <MyButton
          loading={isLoading}
          onClick={() => setAddBlog(true)}
          size="large"
          block
          icon="plus"
        >
          <FormattedMessage {...messages.add} />
        </MyButton>
      </Flex>
    </Wrapper>
  );
};

Blog.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Blog);
