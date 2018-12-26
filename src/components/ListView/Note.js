import React, { Component } from "react";
import "./list-view.css";
import { markComplete, deleteNote } from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';

class Note extends Component {
    render = () => {
        const { title, text, completed, index, markComplete, deleteNote, history, noteid, name, time } = this.props;
        return (

            <div className="note"
                onClick={() => history.push(`/Edit-Note/${index}`)}>

                <div className="note12">
                    <h3 style={{ opacity: completed ? .25 : 1 }}>{title}</h3>
                    <div className="buttons">
                        <button 
                            onClick={e => {
                                e.stopPropagation();
                                markComplete(index)
                            }
                        }
                            className="complete">
                            {
                                completed &&
                                <img src={require("./check2.svg")}
                                    alt="complete"
                                    className="check"
                                />
                            }
                        </button>
                        <button
                            className="delete"
                            onClick={e => {
                                e.stopPropagation();
                                deleteNote(noteid);
                            }}
                        >
                            X
                                </button>
                    </div>
                </div>


                <div className="note22" style={{ opacity: completed ? .25 : 1 }}>
                    <div className="divider" />
                    <p className='text'>{text}</p>
                    <div className='author-date-divider'>
                    <p>Posted by {name}</p>
                    <p>{moment(time.toDate()).format('llll')}</p>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect(null, { markComplete, deleteNote })(Note);