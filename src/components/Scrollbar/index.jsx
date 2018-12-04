import React, { Component } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import Radium from 'radium'

class Scrollbar extends Component {
  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: this.props.thumbColor,
      borderRadius: '5px',
      marginRight: '5px'
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }

  render() {
    return <Scrollbars renderThumbVertical={this.renderThumb} {...this.props} />
  }
}

export default Radium(Scrollbar)
