import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'antd';
import axios from 'axios';

import messages from './messages';
import { IP_ADDRESS } from 'utils/config';
import Flex from 'components/Flex';

const Wrapper = styled.div``;

const Header = styled(Flex)`
  margin-bottom: 15px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e6e8;
`;

const BlogsWrapper = styled.div``;

const BlogWrapper = styled.div`
  box-shadow: 0px 0px 5px #ccc;
  padding: 20px;
  margin-bottom: 25px;
`;

const MyI = styled.i`
  margin-right: 10px;
`;

const MyIcon = styled(Icon)`
  font-size: 18px;
`;

const Blog = styled.div``;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const url = `${IP_ADDRESS}/blog`;
      try {
        const {
          data: { result },
        } = await axios.get(url);
        setBlogs(result);
      } catch (err) {
        console.log('ERR: ', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Wrapper>
      <Title>
        <FormattedMessage {...messages.blogs} />
      </Title>
      <BlogsWrapper>
        {blogs.map((blog, index) => {
          return (
            <BlogWrapper key={index}>
              <Header justifyContent="space-between" alignItems="center">
                <MyIcon type="profile" />
                <div>
                  <MyI>{blog.date}</MyI>
                  <span>{blog.blogger}</span>
                </div>
              </Header>
              <Blog
                ref={ref => {
                  if (ref) ref.innerHTML = blog.blog;
                }}
              ></Blog>
            </BlogWrapper>
          );
        })}
      </BlogsWrapper>
    </Wrapper>
  );
};

export default React.memo(Blogs);
