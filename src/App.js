import React, { Component } from "react";
import SideBar from "./components/SideBar/SideBar";
import ListView from "./components/ListView/ListView";
import AddNote from "./components/AddNote/AddNote";
import EditNote from "./components/EditView/EditView";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      //app code is split up betwee the left sidebar and the right display component
      //right display component will update via react-router-dom
        <div className="App">
          <div className="App-left">
              <SideBar />
          </div>
          <div className="App-right">
            <Route path="/" exact component={ListView} />
            <Route path="/Add-Note" component={AddNote} />
            <Route path="/Edit-Note/:index" component={EditNote} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </div>
        </div>
    );
  }
}

export default App;

//so normally in redux you would use <Route exact path = '/' component ={ListView}
//but in using just react, you have to pass props down, so this format will not work
//the proper format will be to use an arrow function
//<Route exact path = '/' render={props => <ListView notes={this.state.notes} />} />
