# rich-editor 基于 React 的富文本编辑器

## 更新日志

[更新日志](./changelog.md)

## 安装

```shell
npm install @hife/rich-editor
```

or

```shell
yarn add @hife/rich-editor
```

## 使用
```jsx
import RichEditor from '@hife/rich-editor';
import '@hife/rich-editor/styles/rich-editor.css';

const App = () => {
  return <RichEditor
    defaultValue={value}
    max={100}
    onChange={(html: string, text: string) => saveValue(html)}
  />;
};

export default App;
```

## 文档

[文档](https://hifeteam.github.io/rich-editor/)
