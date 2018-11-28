import React, { Component } from 'react';

export default class RoomsList extends Component {
  render() {
    return (
      <div className='column'>
        <ul className='list'>
          <li className='list-header'>Your Rooms</li>
          <li className='list-item'>abcf</li>
          <li className='list-item'>abasd</li>
          <li className='list-item'>abasd</li>
          <li className='list-item'>abcf</li>
          <li className='list-item'>abasd</li>
          <li className='list-item'>abcf</li>
          <li className='list-item'>abasd</li>
        </ul>
        <button className='add-btn'>create Room</button>
      </div>
    );
  }
}
