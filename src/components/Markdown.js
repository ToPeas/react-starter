/**
 * Created by topeas on 2017/6/7.
 */

import React, { Component } from 'react'
import { Button, Input, message, Tag, Tooltip, Upload, Icon, Modal, Menu, } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import marked from 'marked'
import { sendMarkdown } from '../stores/reducer/markdown'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const Dragger = Upload.Dragger

const props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

const mapStateToProps = state => {
  return {
    markdown: state.markdown.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({sendMarkdown}, dispatch)
  return {...actions, dispatch}
}

class Markdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      tags: ['node', 'js'],
      inputVisible: false,
      inputValue: '',
      title: '',
      summary: '',
      localImgVisible: false,
      webImgVisible: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleSummary = this.handleSummary.bind(this)
    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.createMarkdownPreview = this.createMarkdownPreview.bind(this)
  }

  insertText = (text, preStart, preEnd) => {
    let textControl = this.input.refs.input
    const start = textControl.selectionStart
    const end = textControl.selectionEnd
    const origin = this.input.refs.input.value
    if (start !== end) {
      const exist = origin.slice(start, end)
      text = text.slice(0, preStart) + exist + text.slice(preEnd)
      preEnd = preStart + exist.length
    }
    let input = origin.slice(0, start) + text + origin.slice(end)
    this.setState({value: input})

  }

  handleClickMenu = (event) => {
    const _type = event.key

    switch (_type) {
      case 'bold':
        this.insertText('**加粗文字**', 2, 6)
        break
      case 'italic':
        this.insertText('_斜体文字_', 1, 5)
        break
      case 'code':
        this.insertText('```\ncode blockQuote\n ```', 5, 15)
        break
      case 'blockQuote':
        this.insertText('> 引用', 3, 5)
        break
      case 'link':
        this.insertText('[链接名字]()', 1, 5)
        break
      case 'localImgLink':
        this.setState({localImgVisible: true})
        break
      case 'webImgLink':
        this.setState({webImgVisible: true}, () => this.webImgLink.refs.input.focus())

        break
      default:
        alert('没有匹配')
    }

  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleTitle (event) {
    this.setState({title: event.target.value})
  }

  handleSummary (event) {
    this.setState({summary: event.target.value})
  }

  handleClick () {
    const value = marked(this.state.value)
    const {title, tags, summary} = this.state
    const reduxValue = this.props.markdown.markdownContent
    if (!title) return message.error('标题不能为空')
    if (!summary) return message.error('简介不能为空')
    if (!value) return message.error('提交的内容不能为空')
    if (value === reduxValue) return message.warning('提交的内容并没有更新')
    const markdown = {
      title,
      summary,
      content: value,
      tags,
    }

    this.props.sendMarkdown(markdown)
  }

  createMarkdownPreview () {
    return {__html: marked(this.state.value)}
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.setState({tags})
  }

  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  handleInputConfirm = () => {
    const state = this.state
    const inputValue = state.inputValue
    let tags = state.tags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  handleImgLink = () => {
    const url = this.webImgLink.refs.input.value
    if (url === '') return message.warning('链接不能为空')
    const img = `![图片描述](${url})`
    this.insertText(img, 2, 6)
    this.webImgLink.refs.input.value = ''
  }

  render () {
    const {tags, inputVisible, inputValue, localImgVisible, loading, webImgVisible} = this.state
    return (
      <div>
        <header>
          <Button onClick={this.handleClick} size="large">发布</Button>
          <Button size="large">取消</Button>
          <Input onChange={this.handleTitle} placeholder="请输入文章的标题"/>
          <Input onChange={this.handleSummary} placeholder="请输入文章的简介"/>
          <div>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20
              const tagElem = (
                <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              )
              return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{width: 78}}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && <Button size="large" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
          </div>
        </header>
        <Menu
          onClick={this.handleClickMenu}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="bold">
            <Icon type="mail"/>加粗
          </Menu.Item>
          <Menu.Item key="blockQuote">
            <Icon type="api"/>引用
          </Menu.Item>
          <Menu.Item key="code">
            <Icon type="ie"/>代码段
          </Menu.Item>
          <Menu.Item key="link">
            <Icon type="ie"/>链接
          </Menu.Item>
          <Menu.Item key="italic">
            <Icon type="mail"/>斜体
          </Menu.Item>
          <SubMenu title={<span><Icon type="setting"/>添加图片</span>}>
            <Menu.Item key="localImgLink">本地上传</Menu.Item>
            <Menu.Item key="webImgLink">外部链接</Menu.Item>
          </SubMenu>
        </Menu>
        <div dangerouslySetInnerHTML={this.createMarkdownPreview()} style={{'textAlign': 'left'}}/>

        <Input type="textarea"
               rows={15} onChange={this.handleChange} value={this.state.value}
               ref={(input) => this.input = input}
        />

        <Modal
          visible={localImgVisible}
          title="上传图片"
          onOk={this.handleOk}
          onCancel={() => this.setState({localImgVisible: false})}
          footer={[
            <Button key="back" size="large" onClick={() => this.setState({localImgVisible: false})}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
              上传
            </Button>,
          ]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">点击或者拖动图片到此区域</p>
            <p className="ant-upload-hint">支持单次或批量上传，严格禁止上传公司,或者私人的图片。</p>
          </Dragger>
        </Modal>
        <Modal
          title="添加图片链接"
          visible={webImgVisible}
          onOk={this.handleImgLink}
          onCancel={() => {
            this.webImgLink.refs.input.value = ''
            this.setState({webImgVisible: false})
          }}
        >
          <Input placeholder="在这里添加链接" ref={(webImgLink) => this.webImgLink = webImgLink}/>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markdown)
