# RichEditor 富文本编辑器

## Example

```tsx
<RichEditor
  defaultValue={value}
  max={100}
  onChange={(html: string, text: string) => saveValue(html)}
/>
```

## RichEditor props

<table class="readme-table">
  <thead>
  <tr>
    <th>属性</th>
    <th width="200">类型</th>
    <th width="260">默认值</th>
    <th width="260">描述</th>
    <th>是否必填</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>prefix</td>
      <td>string</td>
      <td>hife</td>
      <td>类名前缀</td>
      <td>否</td>
    </tr>
    <tr>
      <td>width</td>
      <td>string</td>
      <td>100%</td>
      <td>编辑器宽度</td>
      <td>否</td>
    </tr>
    <tr>
      <td>width</td>
      <td>string</td>
      <td>100%</td>
      <td>编辑器宽度</td>
      <td>否</td>
    </tr>
    <tr>
      <td>height</td>
      <td>string</td>
      <td>200px</td>
      <td>编辑器高度（不包含 menu 部分）</td>
      <td>否</td>
    </tr>
    <tr>
      <td>border</td>
      <td>string</td>
      <td>1px solid #e2e2e2</td>
      <td>边框样式</td>
      <td>否</td>
    </tr>
    <tr>
      <td>wrapperStyle</td>
      <td>React.CSSProperties</td>
      <td>{}</td>
      <td>编辑器最外层行内样式</td>
      <td>否</td>
    </tr>
    <tr>
      <td>menuStyle</td>
      <td>React.CSSProperties</td>
      <td>{}</td>
      <td>menu 行内样式</td>
      <td>否</td>
    </tr>
    <tr>
      <td>boxStyle</td>
      <td>React.CSSProperties</td>
      <td>{}</td>
      <td>编辑区域行内样式</td>
      <td>否</td>
    </tr>
    <tr>
      <td>defaultValue</td>
      <td>string</td>
      <td>''</td>
      <td>编辑器默认内容</td>
      <td>否</td>
    </tr>
    <tr>
      <td>max</td>
      <td>number</td>
      <td></td>
      <td>能输入字符的最大值</td>
      <td>否</td>
    </tr>
    <tr>
      <td>zIndex</td>
      <td>number</td>
      <td>10</td>
      <td>编辑区域 z-index 值</td>
      <td>否</td>
    </tr>
    <tr>
      <td>uploadImgMaxLength</td>
      <td>number</td>
      <td>1</td>
      <td>上传图片最大的数量</td>
      <td>否</td>
    </tr>
    <tr>
      <td>texts</td>
      <td>Texts（类型定义如下）</td>
      <td>
        {
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
      </td>
      <td>文案（国际化时传入不同的文案值）</td>
      <td>否</td>
    </tr>
    <tr>
      <td>customUploadImg</td>
      <td>(files: FileList, insert: (insertContent: string) => void) => void</td>
      <td>-</td>
      <td>自定义上传图片函数。上传完图片后需要调用 insert() 函数，并且将后端返回的图片地址作为 insert() 的第一个参数传入</td>
      <td>否</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>(html: string, text: string) => void</td>
      <td>-</td>
      <td>内容改变时的回调（可以使用此回调保存用户输入的数据）</td>
      <td>否</td>
    </tr>
    <tr>
      <td>onBlur</td>
      <td>(html: string) => void</td>
      <td>-</td>
      <td>失焦的回调</td>
      <td>否</td>
    </tr>
    <tr>
      <td>onImageTypeError</td>
      <td>() => void</td>
      <td>-</td>
      <td>选择图片类型错误时的回调（可使用此回调来弹窗，提示用户错误信息）</td>
      <td>否</td>
    </tr>
    <tr>
      <td>onUploadImageError</td>
      <td>() => void</td>
      <td>-</td>
      <td>上传图片错误时的回调（对图片数量和大小校验时出错）</td>
      <td>否</td>
    </tr>
  </tbody>
</table>

## Texts inteface
<table class="readme-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>描述</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>deleteLink</td>
      <td>删除链接</td>
    </tr>
    <tr>
      <td>font</td>
      <td>文字颜色</td>
    </tr>
    <tr>
      <td>online</td>
      <td>网络图片</td>
    </tr>
    <tr>
      <td>upload</td>
      <td>上传图片</td>
    </tr>
    <tr>
      <td>linkPic</td>
      <td>图片链接</td>
    </tr>
    <tr>
      <td>linkWord</td>
      <td>链接文字</td>
    </tr>
    <tr>
      <td>insert</td>
      <td>插入</td>
    </tr>
    <tr>
      <td>link</td>
      <td>链接</td>
    </tr>
  </tbody>
</table>
