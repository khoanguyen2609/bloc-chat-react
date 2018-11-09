import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);



    this.state = {
      rooms: [],
      newRoomName: " ",
      name: " "
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
        name: this.state.newRoomName
    });
    this.setState({newRoomName: " "});
  }

  selectRoom(key) {
    this.props.currentRoom(key);
  }


  render () {

    return (
      <section>

        <div id='roomList'>
          <h3>Rooms:</h3>
          <ul>
            {this.state.rooms.map( ( room ) => {
              return (
                <div key={room.key} onClick={(e)=> this.selectRoom(room, e)}> {room.name}</div>
              )
            })}
          </ul>
        </div>

        <form id='newRoomInput'>
          <input type='text' value={this.state.newRoomName} onChange={(e) => this.handleChange(e)} />
          <input type= 'submit' value='Create a room' onClick= {(e) => this.createRoom(e)} /> 
        </form>

      </section>
    );
  }
}

export default RoomList;
