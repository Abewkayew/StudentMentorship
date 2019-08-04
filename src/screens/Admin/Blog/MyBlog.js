import React from 'react';
import styled from 'styled-components';
import { Icon, Select, Input } from 'antd';

import Flex from 'components/Flex';

const { Option } = Select;
const { TextArea } = Input;

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

const MenuBar = styled(Flex)`
  padding: 10px;
  border-bottom: 1px solid #e4e6e8;
  position: sticky;
  top: 0px;
  background-color: rgba(254, 254, 254);
  z-index: 100;
`;

const Item = styled.div`
  margin-right: 25px;
`;

const MyIcon = styled(Icon)`
  font-weight: bold;
  font-size: 18px;
  margin: 0px;
`;

const TextItem = styled(Flex)`
  padding-right: 10px;
  padding-left: 10px;
  border-right: 1px solid #e4e6e8;
  border-left: 1px solid #e4e6e8;
`;

const MySpan = styled.span`
  margin-right: 15px;
`;

const Content = styled.div`
  padding: 25px 20px 0px 20px;
  min-height: 350px;
`;

const StyledTextArea = styled(TextArea)`
  margin-bottom: 25px;
`;

const Preview = styled.div``;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.code = null;
    this.interval = null;
    this.selectionStartIndex = null;
    this.selectionEndIndex = null;
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setSelectionIndexes(document.activeElement);
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  state = {
    blog: '',
  };

  setSelectionIndexes = elem => {
    if (elem.tagName === 'TEXTAREA') {
      this.selectionStartIndex = elem.selectionStart;
      this.selectionEndIndex = elem.selectionEnd;
    }
  };

  setBlog = (blog, cb) =>
    this.setState({ blog }, () => {
      this.code.innerHTML = blog;
      cb && cb();
    });

  replaceByTwoIndex = (original, initialIndex, finalIndex, value) => {
    let first = original.substring(0, initialIndex);
    let second = original.substring(finalIndex + 1, original.length);
    return first + value + second;
  };

  replaceByIndex = (original, index, value) => {
    console.log('replaceByIndex: ', original, index, value);
    this.replaceByTwoIndex(original, index, index, value);
  };

  replaceAll = (original, searchString, value) => {
    while (original.includes(searchString)) {
      original = original.replace(searchString, value);
    }
    return original;
  };

  getOpenTagName = (openTag, len) => {
    return openTag.substring(1, openTag.length - 1);
  };

  getClosedTagName = (closedTag, len) => {
    return closedTag.substring(2, closedTag.length - 1);
  };

  checkHeaders = (style1, style2) => {
    return style1[0] === style2[0] && style1[0] === 'h';
  };

  checkList = (style1, style2) => {
    return (
      (style1 === 'ol' && style2 === 'ul') ||
      (style1 === 'ul' && style2 === 'ol')
    );
  };

  hasCorrectTagSyntax = (style, blog) => {
    const styleLength = style.length;
    const first = blog.substring(0, styleLength + 2);
    const end = blog.substring(blog.length - styleLength - 3);
    const openTagName = this.getOpenTagName(first, style.length);

    return (
      this.checkHeaders(style, openTagName) ||
      (style === openTagName && first === end.replace('/', ''))
    );
  };

  isStyleActive = (style, blog) => {
    return this.hasCorrectTagSyntax(style, blog);
  };

  removeStyle = (style, blog) => {
    // const openTagRightAngleIndex = blog.indexOf('>');
    // const oldStyle = this.getOpenTagName(
    //   blog.substring(0, openTagRightAngleIndex + 1),
    // );
    const first = this.replaceByTwoIndex(blog, 0, style.length + 1, '');
    const modifiedBlog = this.replaceByTwoIndex(
      first,
      first.length - style.length - 3,
      first.length,
      '',
    );

    return modifiedBlog;
    // this.setBlog(modifiedBlog, () => {
    //   if (this.isHeader(style) && oldStyle !== style) this.handleOnStyle(style);
    // });
  };

  isHeader = style => {
    let result = false;
    if (style === 'h1' || style === 'h2' || style === 'h3') result = true;
    return result;
  };

  handleToggleOnStyle = (style, blog) => {
    let modifiedBlog = null;
    if (this.isStyleActive(style, blog)) {
      modifiedBlog = this.removeStyle(style, blog);
    } else {
      modifiedBlog = this.handleOnStyle(style, blog);
    }

    return modifiedBlog;
  };

  handleOnChangeFragment = (style, callback) => {
    const { blog } = this.state;
    const first = blog.substring(0, this.selectionStartIndex);
    const second = blog.substring(this.selectionEndIndex, blog.length);
    const toChange = blog.substring(
      this.selectionStartIndex,
      this.selectionEndIndex,
    );

    const modifiedSelected = callback(style, toChange);
    const modifiedBlog = first + modifiedSelected + second;

    this.setBlog(modifiedBlog);
  };

  handleOnStyle = (style, blog) => {
    const modifiedBlog = this.replaceByTwoIndex(
      blog,
      0,
      0,
      `<${style}>` + blog[0],
    );
    const modifiedBlogLength = modifiedBlog.length;
    const newBlog = this.replaceByTwoIndex(
      modifiedBlog,
      modifiedBlogLength - 1,
      modifiedBlogLength - 1,
      modifiedBlog[modifiedBlogLength - 1] + `</${style}>`,
    );

    return newBlog;
  };

  handleOnRemoveList = (style, blog) => {
    const unorderedListRemoved = blog
      .replace(`<${style}>`, '')
      .replace(`</${style}>`, '');
    const listItemRemoved = this.replaceAll(
      this.replaceAll(
        this.replaceAll(unorderedListRemoved, '<li>', ''),
        '</li>',
        '',
      ),
      '\t',
      '',
    ).trim();

    return listItemRemoved;
  };

  handleOnApplyList = (style, blog) => {
    const items = blog.split('\n');
    var newBlog = `<${style}>\n`;
    for (let i = 0; i < items.length; i++) {
      newBlog += `\t<li>${items[i]}</li>\n`;
    }
    newBlog += `</${style}>`;

    const modifiedBlog = this.replaceByTwoIndex(
      blog,
      0,
      blog.length - 1,
      newBlog,
    );

    return modifiedBlog;
  };

  handleOnToggleList = (style, blog) => {
    let modifiedBlog = null;
    if (this.isStyleActive(style, blog)) {
      modifiedBlog = this.handleOnRemoveList(style, blog);
    } else {
      modifiedBlog = this.handleOnApplyList(style, blog);
    }

    return modifiedBlog;
  };

  handleOnBold = () => {
    this.handleOnChangeFragment('b', this.handleToggleOnStyle);
  };

  handleOnItalic = () => {
    this.handleOnChangeFragment('i', this.handleToggleOnStyle);
  };

  handleOnUnderline = () => {
    this.handleOnChangeFragment('u', this.handleToggleOnStyle);
  };

  handleFontSizeChange = value => {
    this.handleOnChangeFragment(value, this.handleToggleOnStyle);
  };

  render() {
    const { blog } = this.state;
    return (
      <Wrapper>
        <Title>
          <LargeP>Title</LargeP>
        </Title>
        <MenuBar alignItems="center">
          <Item>
            <MyIcon onClick={this.handleOnBold} type="bold" />
          </Item>
          <Item>
            <MyIcon onClick={this.handleOnItalic} type="italic" />
          </Item>
          <Item>
            <MyIcon onClick={this.handleOnUnderline} type="underline" />
          </Item>
          <Item>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Item>
          <Item>
            <MyIcon
              onClick={() =>
                this.handleOnChangeFragment('ol', this.handleOnToggleList)
              }
              type="ordered-list"
            />
          </Item>
          <Item>
            <MyIcon
              onClick={() =>
                this.handleOnChangeFragment('ul', this.handleOnToggleList)
              }
              type="unordered-list"
            />
          </Item>
          <TextItem alignItems="center" justifyContent="center">
            <MySpan>Normal</MySpan>
            <Icon type="caret-down" />
          </TextItem>
          <TextItem alignItems="center" justifyContent="center">
            <MySpan>Font</MySpan>
            <Icon type="caret-down" />
          </TextItem>
          <TextItem alignItems="center" justifyContent="center">
            <Select
              onSelect={value => this.handleFontSizeChange(value)}
              defaultValue="Size"
            >
              <Option value="h1">h1</Option>
              <Option value="h2">h2</Option>
              <Option value="h3">h3</Option>
              <Option value="p">p</Option>
            </Select>
          </TextItem>
        </MenuBar>
        <Content>
          <StyledTextArea
            value={blog}
            onChange={e => this.setBlog(e.target.value)}
            rows={8}
          />
          <Preview>
            <code ref={ref => (this.code = ref)}></code>
          </Preview>
        </Content>
      </Wrapper>
    );
  }
}

export default Blog;
