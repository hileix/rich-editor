import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isMobile } from './utils';

export interface RichEditorProps {
  /**
   * 类名前缀
   */
  prefix: string;
  /**
   * 编辑器宽度
   */
  width: string;
  /**
   * 编辑器高度（不包含 menu 部分）
   */
  height: string;
  /**
   * 边框样式，如："1px solid red"
   */
  border: string;
  /**
   * 编辑器最外层行内样式
   */
  wrapperStyle: React.CSSProperties;
  /**
   * menu 行内样式
   */
  menuStyle: React.CSSProperties;
  /**
   * 编辑区域行内样式
   */
  boxStyle: React.CSSProperties;
  /**
   * 编辑器内容
   */
  defaultValue: string;
  /**
   * 能输入字符串的最大值
   */
  max?: number;
  /**
   * 编辑区域 z-index
   */
  zIndex: number;
  /**
   * 上传图片最大的数量
   */
  uploadImgMaxLength: number;
  /**
   * 文案
   */
  texts: {
    deleteLink: string;
    title: string;
    font: string;
    online: string;
    upload: string;
    linkPic: string;
    linkWord: string;
    insert: string;
    link: string;
  };
  /**
   * 自定义上传图片函数
   * 上传完图片后需要调用 insert() 函数，并且将后端返回的图片地址作为 insert() 的第一个参数传入
   */
  customUploadImg?: (
    files: FileList,
    insert: (insertContent: string) => void
  ) => void;
  /**
   * 内容改变时的回调
   */
  onChange?: (html: string, text: string) => void;
  /**
   * 失焦的回调
   */
  onBlur?: (html: string) => void;
  /**
   * 选择图片类型错误时的回调
   */
  onImageTypeError?: () => void;
  /**
   * 上传图片出错的回调
   */
  onUploadImageError?: () => void;
}

export interface RichEditorState {
  defaultValue: string;
}

class RichEditor extends React.Component<RichEditorProps, RichEditorState> {
  static propTypes = {
    lang: PropTypes.string,
    onChange: PropTypes.func,
    uploadImgMaxLength: PropTypes.number,
    zIndex: PropTypes.number,
    height: PropTypes.string,
    width: PropTypes.string,
    border: PropTypes.string,
    wrapperStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    boxStyle: PropTypes.object,
    scriptStyle: PropTypes.object,
    defaultValue: PropTypes.string,
    max: PropTypes.number
  };

  static defaultProps = {
    prefix: 'hife',
    defaultValue: '',
    uploadImgMaxLength: 1,
    zIndex: 10,
    width: '100%',
    height: '200px',
    border: '1px solid #e2e2e2',
    wrapperStyle: {},
    menuStyle: {},
    boxStyle: {},
    texts: {
      deleteLink: '删除链接',
      title: '设置标题',
      font: '文字颜色',
      online: '网络图片',
      upload: '上传图片',
      linkPic: '图片链接',
      linkWord: '链接文字',
      insert: '插入',
      link: '链接'
    }
  };

  constructor(props: RichEditorProps) {
    super(props);

    this.state = {
      defaultValue: props.defaultValue
    };
  }

  richEditorMenu: HTMLDivElement;
  richEditorBox: HTMLDivElement;
  editor: any;

  componentDidMount() {
    if (isMobile()) {
      return;
    }
    const wangEditor = require('./wangeditor');
    this._richEditorCreater(
      wangEditor,
      this.richEditorMenu,
      this.richEditorBox
    );
  }

  _richEditorCreater = (
    RichEditor: any,
    menuDOM: HTMLDivElement,
    boxDom: HTMLDivElement
  ) => {
    const {
      onChange,
      onBlur,
      uploadImgMaxLength,
      zIndex,
      texts,
      customUploadImg,
      onImageTypeError,
      onUploadImageError
    } = this.props;

    const { defaultValue } = this.state;

    this.editor = new RichEditor(
      this.richEditorMenu || menuDOM,
      this.richEditorBox || boxDom
    );

    this.editor.customConfig.customAlert = onUploadImageError;

    this.editor.customConfig.menus = [
      'bold',
      'foreColor',
      'quote',
      'link',
      'image',
      'hr'
    ];

    this.editor.customConfig.lang = {
      删除链接: texts.deleteLink,
      设置标题: texts.title,
      文字颜色: texts.font,
      网络图片: texts.online,
      上传图片: texts.upload,
      图片链接: texts.linkPic,
      链接文字: texts.linkWord,
      插入: texts.insert,
      链接: texts.link
    };

    this.editor.customConfig.debug =
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

    // monitor change and update to renderSoundData Object
    this.editor.customConfig.onchange = (html: string, text: string) => {
      onChange && onChange(html, text);
    };

    // monitor blur event
    this.editor.customConfig.onblur = (html: string) => {
      onBlur && onBlur(html);
    };

    // limit most upload picture count
    this.editor.customConfig.uploadImgMaxLength = uploadImgMaxLength;

    if (customUploadImg) {
      this.editor.customConfig.customUploadImg = customUploadImg;
    }

    if (onImageTypeError) {
      this.editor.customConfig.customUploadImg.accept = onImageTypeError;
    }

    this.editor.customConfig.zIndex = zIndex;

    this.editor.create();

    defaultValue && this.editor.txt.html(defaultValue);

    this.forceUpdate();

    /**
     * 原因是点击事件由mousedown,mouseup都在元素内时触发，但若第一次鼠标抬起时在元素外，认为没有触发点击事件，点击事件会开始onchange，我们改第一次down为人为触发click即可
     *
     * https://github.com/wangfupeng1988/wangEditor/issues/1749#issuecomment-433587597
     */
    setTimeout(() => {
      this.richEditorBox.click();
    }, 10);
  };

  render() {
    const {
      prefix,
      height,
      width,
      border,
      wrapperStyle,
      menuStyle,
      boxStyle,
      max
    } = this.props;
    const content = (this.editor && this.editor.txt.text()) || '';
    const maxClass = classNames({
      [`${prefix}-rich-editor__max`]: true,
      [`${prefix}-rich-editor__max--disabled`]: max && content.length >= max
    });

    return (
      <section className={`${prefix}-rich-editor`} style={wrapperStyle}>
        <div
          className={`${prefix}-rich-editor__menu`}
          style={menuStyle}
          ref={(richEditorMenu: HTMLDivElement) => {
            this.richEditorMenu = richEditorMenu;
          }}
        />
        <div
          className={`${prefix}-rich-editor__box`}
          style={boxStyle}
          ref={(richEditorBox: HTMLDivElement) => {
            this.richEditorBox = richEditorBox;
          }}
        />

        {max && (
          <div className={maxClass}>
            {content.length}/{max}
          </div>
        )}
        <style>{`
          .${prefix}-rich-editor {
            position: relative;
          }
          .${prefix}-rich-editor__menu {
            border: ${border};
            width: ${width};
            height: 27px;
            box-sizing: border-box;
            margin-top: 16px;
            user-select: none;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          }
          .${prefix}-rich-editor__box {
            border-left: ${border};
            border-right: ${border};
            border-bottom: ${border};
            width: ${width};
            height: ${height};
            box-sizing: border-box;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .${prefix}-rich-editor__subscript {
            font-size: 12px;
            color: #9b9b9b;
            position: absolute;
            right: 49px;
            bottom: 9px;
          }
        `}</style>
      </section>
    );
  }
}

export default RichEditor;
