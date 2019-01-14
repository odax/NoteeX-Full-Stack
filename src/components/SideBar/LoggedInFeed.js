import React, { Component } from 'react'
import moment from 'moment';
export default class LoggedInFeed extends Component {
  render() {
      const {notifications} = this.props;
    return (
      <div>
        <ul>
          { notifications && notifications.map( item => {
              return (
                  <li key={item.id}>
                    <span>{item.user}</span>
                    <span>{item.content}</span>
                    <div>
                        {moment(item.time.toDate()).fromNow()}
                    </div>
                  </li>
              )
          })}
        </ul>
      </div>
    )
  }
}

//notifications && checks if it actually exists the runs the map, or else it does nothing.