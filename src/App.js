import React, { Component } from 'react';
import * as firebase from 'firebase'
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import './App.css';


  // Initialize Firebase
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
    this.state = {
      activeRoom : null
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return(
      <div>
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    )
  }
}

export default App;
