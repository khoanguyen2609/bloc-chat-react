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
  constructor(props) {
    super(props);
    this.state = { activeRoom: '', user: '' };
    this.activateRoom = this.activateRoom.bind(this);
  }

  activateRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <main>
        </main>
        < User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
        < RoomList firebase={firebase} activeRoom={this.state.activeRoom} activateRoom={this.activateRoom.bind(this)}/>
        < MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} activateRoom={this.activateRoom.bind(this)}/>
      </div>
    );
  }
}

export default App;
