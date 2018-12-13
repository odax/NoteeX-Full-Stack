import React, { Component } from 'react'

export default class Settings extends Component {
  state = {
      hideComplete: false,
      listView: false
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    })
  }
  render() {
    return (
      <form>
        <label>
          Hide complete notes
          <input
            name="hideComplete"
            type="checkbox"
            onChange={this.handleInputChange} />
        </label>
        <label>
          List View
          <input
            name="listView"
            type="checkbox"
            onChange={this.handleInputChange} />
        </label>
      </form>
    )
  }
}