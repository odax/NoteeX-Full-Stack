import React, { Component } from 'react'
import ListView from './ListView';
import './ListViewContainer.css';
import { connect } from 'react-redux';

class ListViewContainer extends Component {
  render() {
    return (
      <div className='ListVIewContainer'>
        <ListView authId={this.props.authId}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      authId: state.firebase.auth.uid
    }
  }

export default connect(mapStateToProps)(ListViewContainer);