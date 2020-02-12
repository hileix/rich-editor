import React from 'react';
import RichEditor from '../';
import '../../styles/rich-editor.css';
import markdown from '../README.md';
import { storiesOf } from '@storybook/react';

const { useState } = React;

const Simple = () => {
  const [html, setHtml] = useState('<p>hello RichEditor!</p>');
  const [text, setText] = useState('hello RichEditor!');

  return (
    <div>
      <RichEditor
        width='100%'
        defaultValue={html}
        max={100}
        onChange={(html: string, text: string) => {
          setHtml(html);
          setText(text);
        }}
      ></RichEditor>
      <div>html: {html}</div>
      <div>text: {text}</div>
    </div>
  );
};

const CustomUploadImage = () => {
  const [html, setHtml] = useState('<p>hello RichEditor!</p>');
  const [text, setText] = useState('hello RichEditor!');

  const mockUploadImage = (formData: FormData) => {
    console.log('正在上传图片：', formData);
    return new Promise((resolve, reject) => {
      const res = {
        data:
          'http://cdn.himalaya.com/40fc0de0b53f42fe9f3f3011243af8c6.png?x-oss-process=image/resize,w_100,h_100&auth_key=4102416000-1234-0-1753249b5a514918bc5c545847d206ba'
      };
      setTimeout(() => {
        resolve(res);
      }, 200);
    });
  };

  const handleCustomUploadImg = (
    files: FileList,
    insert: (insertContent: string) => void
  ) => {
    const formData = new window.FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`picture`, files[i]);
    }
    mockUploadImage(formData).then((res: any) => {
      insert(res.data);
    });
  };

  return (
    <div>
      <RichEditor
        width='100%'
        defaultValue={html}
        max={100}
        onChange={(html: string, text: string) => {
          setHtml(html);
          setText(text);
        }}
        customUploadImg={handleCustomUploadImg}
      ></RichEditor>
      <div>html: {html}</div>
      <div>text: {text}</div>
    </div>
  );
};

storiesOf('RichEditor 富文本编辑器', module)
  .add('最简单的 RichEditor', () => <Simple />, {
    info: {
      text: markdown
    }
  })
  .add('自定义上传图片逻辑', () => <CustomUploadImage />, {
    info: {
      text: markdown
    }
  });
