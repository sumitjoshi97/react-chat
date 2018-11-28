import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return <div style={styles.header} >header</div>
  }
}

const styles = {
  header: {
    background: '#1d5391',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '60px',
    width: '100%'
  }
}
