/**
 * Created by topeas on 2017/6/7.
 */

import React, {Component} from 'react'
import {Button, Input, Rate, message, Tag, Tooltip, Upload, Icon, Modal} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import marked from 'marked'
import {sendMarkdown} from '../stores/reducer/markdown'

const mapStateToProps = state => {
  return {
    markdown: state.markdown.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({ sendMarkdown }, dispatch)
  return { ...actions, dispatch }
}

class Markdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      tags: ['node', 'js'],
      inputVisible: false,
      inputValue: '',
      title: '',
      summary: '',
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleSummary = this.handleSummary.bind(this)
    this.createMarkdownPreview = this.createMarkdownPreview.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleTitle(event) {
    this.setState({ title: event.target.value })
  }

  handleSummary(event) {
    this.setState({ summary: event.target.value })
  }

  handleClick() {
    const value = marked(this.state.value)
    const { title, tags, summary } = this.state
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

  createMarkdownPreview() {
    return { __html: marked(this.state.value) }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
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

  saveInputRef = input => this.input = input

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange1 = ({ fileList }) => this.setState({ fileList })

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <header>
          <Button onClick={this.handleClick} size="large">发布</Button>
          <Button size="large">取消</Button>

          <Input onChange={this.handleTitle} placeholder="请输入文章的标题"/>
          <Input onChange={this.handleSummary} placeholder="请输入文章的简介"/>
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange1}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage}/>
            </Modal>
          </div>
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
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && <Button size="large" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
          </div>
        </header>
        <Input type="textarea"
               rows={4} onChange={this.handleChange} value={this.state.value}/>
        <div dangerouslySetInnerHTML={this.createMarkdownPreview()}/>
        <Rate/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markdown)
