import React, { Component } from 'react';

export default class MembersList extends Component {
  render() {
    return (
      <div className='column'>
        <ul class='list'>
          <li className='list-header'>Members list</li>
          <li className='list-item'>asdasa</li>
          <li className='list-item'>asdasd</li>
          <li className='list-item'>asdasa</li>
          <li className='list-item'>asdasd</li>
          <li className='list-item'>asdasa</li>
          <li className='list-item'>asdasd</li>
          <li className='list-item'>asdasa</li>
          <li className='list-item'>asdasd</li>
          <li className='list-item'>asdasa</li>
          <li className='list-item'>asdasd</li>
          {/* {this.props.users.map(user => (
            <li>{user}</li>
          ))} */}
        </ul>
        <button className='add-btn'>Add</button>
      </div>
    );
  }
}
