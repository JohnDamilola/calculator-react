import React from 'react';
import ReactDOM from 'react-dom';

// import './styles/index2.css';
// import './styles/bootstrap.css';
// import './styles/materialdesignicons.min.css';
// import './styles/font-awesome.css';
// import './icon100x100.png';

// var ChatHeader = React.createClass({
//   getInitialState: function(){
//     var times = Date();
//     times = times.slice(15);
//     times = times.slice(0,9);
//     return{
//       times: times,
//     }
//   },
//   render: function() {
//     var time = Date();
//     time = time.slice(0,15);
//     return(
//       <div>
//           <h3 className="head"><i className="fa fa-slack"></i> slack</h3>
//           <h6 className="text-center"><b>{time}</b></h6>
//           <hr/>
//       </div>
//     );
//   }
// });

var Welcome = React.createClass({
  render: function() {
    return(
      <div>
          <h4 className="welcome text-center">Welcome to <i className="fa fa-slack"></i> slack</h4>
          <h6 className="text-center"><i>Your conversation with Slackbot begins here</i></h6>
          <hr/>
      </div>
    );
  }
});

var Input = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(e.target.value);
    var input = ReactDOM.findDOMNode(this.refs.in)
    var timed = Date();
    if (input.value!==""){
      this.props.addTodo(input.value, timed);
      input.value="";
    }
  },
  render: function() {
    return(
      <div className="margin-top">
      <div className="col-xs-11">
      <form onSubmit={this.handleSubmit}>
          <input className="inputs" ref="in" placeholder="Enter message"/>
      </form>
      </div>
      <div className="col-xs-1">
        <button className="btn btn-md btn-slack" onClick={this.handleSubmit}>Send ></button>
      </div>
      </div>
    );
  }
});

var ChatItem = React.createClass({
  render: function() {
    return(
        <div className="item">
          <div className="col-md-12">
            <img alt="logo" className="pull-left" src="./src/icon100x100.png" width="40"/>
            <p className="p pull-left"><b>JohnDamilola: </b> {this.props.text}<br/>{this.props.timer}</p>
            <button className="red pull-right" onClick={this.handleSubmit}><i className="fa fa-trash"></i></button>
          </div>
        </div>
    );
  }
});

var Slack = React.createClass({
  getInitialState: function(){
    return {
      total: [],
      chatItem: [],
      time: [],
    }
  },
  componentWillMount: function(){
    this.setState({
      chatItem: this.state.chatItem,
      time: Date().slice(15).slice(0,6),
    });
  },
  componentDidMount: function(){
    this.setState({
      chatItem: this.state.chatItem,
      time: Date().slice(15).slice(0,6),
    });
  },
  addTodo: function(item, timed){
    this.setState({
      chatItem: this.state.chatItem.concat(item),
      time: Date().slice(15).slice(0,6),
    });
  },
  render: function(){
    // var total = this.state.total;
    var chatItem = this.state.chatItem;
    var time = this.state.time;
    // var totals = total.concat({
    //   one: chatItem,
    //   two: time,
    // });

    var chats = chatItem.map(function(chat) {
      return (<ChatItem text={chat} timer={time}/>)
    });
    // var chats = totals.map(function(totals, i) {
    //   var one = totals.one.map(function(chat) {
    //      return chat;
    //   });
    //   return (
    //     <ChatItem timer={totals.two} text={one} />
    //   );
    // });
    return(
      <div className="col-md-12">
        <Welcome />
        <div>
        <div className="inner">
          {chats}
        </div>
        <Input addTodo={this.addTodo}/>
        </div>
      </div>
    )
  }
});

export default Slack;
