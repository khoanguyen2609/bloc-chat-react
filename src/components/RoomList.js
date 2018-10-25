import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[],
      newRoomName:''
    }

  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.deleteRoom = this.deleteRoom.bind(this)

  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
    this.roomsRef.on('child_removed', snapshot => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key) })
    });
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState ({newRoomName:''});
  }

  deleteRoom (room) {
  }

  render() {
    return(
      <div className ='room-list'>
          <div>
          {this.state.rooms.map((room,index) =>
            <ul key={index}>
              <li>
                <button className="room-name" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
              </li>
            </ul>
          )}

        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newRoomName} onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default RoomList;
