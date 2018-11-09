import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      content: "",
      sentAt: "",
      roomId: "",
      };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  createMessage(e, user) {
    console.log(this.props.user);
    e.preventDefault();

    this.messagesRef.push({
      user: this.props.user,
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.currentRoom,
    });
    this.setState({content: ""});
  }



  render() {

    const currentRoom = this.props.currentRoom;
    const messageList = this.state.messages



    .filter(message => message.roomId === currentRoom)
    .map(message => {
      return <div className='thisMessage' key={message.key}>{message.user + ":" + message.content + " Sent At:" + message.sentAt}</div>
    })


    return (
      <div className='chatMessages'>
        <div>{messageList}</div>
        <form id="newMessage" >
          <input type='text' value={this.state.content} onChange={(e) => this.handleChange(e)} />
          <input type='submit' value='Type a message' onClick={(e) => this.createMessage(e)} />
        </form>
      </div>

    );
  }

}

export default MessageList;
