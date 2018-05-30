import React, { Component } from 'react';
import { addNote } from '../../actions';
import { connect } from 'react-redux';


class AddNote extends Component {
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
        if( title !== '' && text !== '') {
        const newNote = { title, text, completed: false};
        this.props.addNote(newNote);
        this.props.history.push('/');
        }
    }

    handleChange = (e) => {
        this.setState({title: e.target.value})
    }
    
    render() {
        const { title, text } = this.state;
        return (
            <div className='page new-note'>
                <div>
                    <h2>New Note</h2>
                    <div className = 'new-note-form'>
                        <form onSubmit = {this.submit}>
                            <div className='input'>
                                <input 
                                type='text'
                                placeholder='Note Title'
                                onChange={(e) => this.setState({title: e.target.value})}
                                value={title}
                                />
                            </div>
                            <div className='input'>
                                <textarea
                                placeholder='Note Content'
                                onChange={e => this.setState({ text: e.target.value})}
                                value={text}></textarea>
                            </div>
                            <div className='input'>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {addNote})(AddNote);