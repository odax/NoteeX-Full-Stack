import React, { Component } from "react";
import Note from "./Note";
import "./list-view.css";
import { connect } from 'react-redux';

class ListView extends Component {
  // this basically says that if the new props are different, re-render
  shouldComponentUpdate = nextProps => {
    if (nextProps.notes !== this.props.notes) return true;
    else return false;
  };

  render() {
    const { history } = this.props;
    //took out notes from the destructuring above
    return (
      <div className="list-view">
        <h2>Notes:</h2>
        <div className="notes">
          {this.props.notes.map((note, i) => {
            const { id, title, text, completed } = note;
            return (
              <Note key={id} id={id} index={i} title={title} text={text} completed={completed} history={history} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state
  }
}

export default connect(mapStateToProps)(ListView);
