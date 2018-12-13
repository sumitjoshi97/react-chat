import React, { Component } from 'react'
import Scrollbars from 'react-custom-scrollbars'

export default class Scrollbar extends Component {
  renderThumb = ({ style }) => {
    const thumbStyle = {
      backgroundColor: this.props.thumbColor,
      borderRadius: '5px',
      marginRight: '5px'
    }
    return <div style={{ ...style, ...thumbStyle }} />
  }

  render() {
    return (
      <Scrollbars
        renderThumbVertical={this.renderThumb}
        autoHide={this.props.autoHide}
        autoHideTimeout={1000}
        autoHideDuration={400}
      >
        {this.props.children}
      </Scrollbars>
    )
  }
}
