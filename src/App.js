import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
  apiKey: "AIzaSyBasKm1DfFkjbMblrak3L6FRbqsPkVMKOk",
  authDomain: "bloc-chat-react-557b3.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-557b3.firebaseio.com",
  projectId: "bloc-chat-react-557b3",
  storageBucket: "",
  messagingSenderId: "892414079904"
};
firebase.initializeApp(config);

class App extends Component {
constructor(props){
  super(props)

  this.state = {
    currentRoom: '',
    user: null
  };
}

setCurrentRoom(room ) {
  this.setState({currentRoom: room})
}

setUser(user){
  if (user === null ) {
    return this.setState({ user: "Guest"})
  } else return this.setState({user: user.displayName})
}

  render() {

    const showMessages = this.state.currentRoom;

    return (
      <div className='App'>
        <header>
          <h1>Current Room:  {this.state.currentRoom.name}</h1>
          <h3>
            <User firebase = {firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
          </h3>
        </header>

        <aside>
          <RoomList firebase={firebase} currentRoom={this.setCurrentRoom.bind(this)}/>
        </aside>

        <main>

          <div id="messagePlane">
            {showMessages ? (<MessageList firebase={firebase} currentRoom={this.state.currentRoom.key} user={this.state.user} />) : (null) }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
