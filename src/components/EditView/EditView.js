import React, { Component } from 'react';
import { updateNote } from '../../actions';
import { connect } from 'react-redux';

import './EditView.css';


class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }
    }

    submit = (e) => {
        e.preventDefault();
        const { title, text } = this.state;
        const { notes, match } = this.props;
        const note = notes[match.params.index];
        this.props.updateNote({
            title: title === '' ? note.title : title,
            text: text === '' ? note.text : text,
            completed: note.completed,
            id: note.id
        }, match.params.index);
        this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    render() {
        const { title, text } = this.state;
        const { notes, match } = this.props;
        const note = notes[match.params.index];
        return (
            <div className='page new-note'>
                    <h2>Edit Note</h2>
                    <div className='new-note-form'>
                        <form onSubmit={this.submit}>
                                <input
                                    type='text'
                                    //{this.props.notes[this.props.match.params.index].title} = note.title
                                    placeholder={note.title}
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    value={title}
                                />
                                <textarea
                                    placeholder={note.text}
                                    onChange={e => this.setState({ text: e.target.value })}
                                    value={text}
                                    ></textarea>
                                <button>Submit</button>
                        </form>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.project
    }
}

export default connect(mapStateToProps, { updateNote })(EditNote);