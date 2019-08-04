import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSimpleMDE from 'react-simplemde-editor';
import SimpleMDE from 'simplemde';
import 'easymde/dist/easymde.min.css';

import { SIMPLE_EDITOR_LOCAL_KEY } from 'utils/constants';
import { getSavedBlog } from 'utils/helpers';

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

const Blog = () => {
  const [blog, setBlog] = useState('');
  const id = 1;

  useEffect(() => {
    setBlog(getSavedBlog(`${SIMPLE_EDITOR_LOCAL_KEY}${id}`) || '');
  }, []);

  const convertMDtoHTML = blog => SimpleMDE.prototype.markdown(blog);

  blog && console.log('html: ', convertMDtoHTML(blog));

  return (
    <Wrapper>
      <Title>
        <LargeP>Title</LargeP>
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
    </Wrapper>
  );
};

export default Blog;
