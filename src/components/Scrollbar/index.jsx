import React, { Component } from 'react'
import Scrollbars from 'react-custom-scrollbars'

export default class Scrollbar extends Component {
  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: this.props.thumbColor,
      borderRadius: '5px',
      marginRight: '5px'
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }

  render() {
    return (
      <Scrollbars
        renderThumbVertical={this.renderThumb}
        {...this.props.children}
      />
    )
  }
}
