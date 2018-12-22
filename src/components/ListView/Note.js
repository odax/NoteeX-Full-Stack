import React, { Component } from "react";
import "./list-view.css";
import { markComplete, deleteNote } from '../../actions';
import { connect } from 'react-redux';

class Note extends Component {
    render = () => {
        const { title, text, completed, index, markComplete, deleteNote, history, id, name } = this.props;
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
                                deleteNote(id);
                            }}
                        >
                            X
                                </button>
                    </div>
                </div>


                <div className="note22" style={{ opacity: completed ? .25 : 1 }}>
                    <div className="divider" />
                    <p>{text}</p>
                    <p>{name}</p>
                </div>
            </div>
        );
    };
}

export default connect(null, { markComplete, deleteNote })(Note);