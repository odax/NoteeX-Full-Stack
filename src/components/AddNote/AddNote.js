import React, { Component } from "react";
import { addNote } from "../../actions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./AddNote.css";
import Button from "@material-ui/core/Button";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      isChecked: false
    };
  }

  submit = e => {
    e.preventDefault();
    const { title, text } = this.state;
    if (title !== "" && text !== "") {
      const newNote = { title, text, completed: false, publicNote: this.state.isChecked };
      this.props.addNote(newNote);
      this.props.history.push("/"); //history.push is an easy way to update the current route
    }
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  _handleChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  render() {
    const { auth } = this.props;
    const { title, text } = this.state;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    let label;
    if (this.state.isChecked === false) {
        label = <p>Private</p>;
    } else {
        label = <p>Public</p>
    }
    return (
      <div className="page new-note">
        <div>
          <h2>New Note</h2>
          <div className="new-note-form">
            <form onSubmit={this.submit}>
              <div className="input">
                <input
                  type="text"
                  placeholder="Note Title"
                  onChange={e => this.setState({ title: e.target.value })}
                  value={title}
                />
              </div>
              <div className="input textarea">
                <textarea
                  placeholder="Note Content"
                  onChange={e => this.setState({ text: e.target.value })}
                  value={text}
                />
              </div>
              <div className="switch-container">
                <label>
                  {label}
                  <input
                    ref="switch"
                    checked={this.state.isChecked}
                    onChange={this._handleChange}
                    className="switch"
                    type="checkbox"
                  />
                  <div>
                    <div />
                  </div>
                </label>
              </div>
              <div className="input">
              <Button
              variant="contained"
              color="primary"
              className="myNotes-button"
              type="submit"
              value="submit"
            >
              Create
            </Button>
              </div>
            </form>
            <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className="myNotes-button"
            >
              Cancel
            </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { addNote }
)(AddNote);
