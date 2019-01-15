import React, { Component } from 'react'
import moment from 'moment';
import './side-bar.css';
export default class LoggedInFeed extends Component {
  render() {
      const {notifications} = this.props;
    return (
      <div>
        <h5>Notifications</h5>
        <ul className='list'>
          { notifications && notifications.map( item => {
              return (
                <div>
                  <li key={item.id}>
                    <span>{item.user + ' '}</span>
                    <span>{item.content + ' '}
                        {moment(item.time.toDate()).fromNow() + '.'}
                    </span>
                  </li>
                </div>
              )
          })}
        </ul>
      </div>
    )
  }
}

//notifications && checks if it actually exists the runs the map, or else it does nothing.