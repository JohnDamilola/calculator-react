import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index2.css';
import './styles/bootstrap.css';
import './styles/materialdesignicons.min.css';
import './styles/font-awesome.css';
import './icon100x100.png';

var ChatHeader = React.createClass({
  getInitialState: function(){
    var times = Date();
    times = times.slice(15);
    times = times.slice(0,9);
    return{
      times: times,
    }
  },
  render: function() {
    return(
      <div>
          <h3 className="head"><i className="fa fa-facebook"></i> comments</h3>
          <h6 className="text-center"><b>{this.state.times}</b></h6>
          <hr/>
      </div>
    );
  }
});


var Input = React.createClass({
  handleName: function(e) {
    e.preventDefault();
    this.setState({name: e.target.value})
  },
  handleComment: function(e) {
    e.preventDefault();
    this.setState({comment: e.target.value})
  },
  handleSubmit: function() {
    var names = ReactDOM.findDOMNode(this.refs.names).value;
    var comment = ReactDOM.findDOMNode(this.refs.comment).value;
    this.props.addComment(names,comment);
  },
  render: function() {
    return(
      <div className="margin-top">
      <div className="col-xs-12">
      <form>
          <input className="inputs" onChange={this.handleSubmit} ref="names" placeholder="Your name?"/>
          <input className="inputs" onChange={this.handleSubmit} ref="comment" placeholder="Enter comment here"/>
      </form>
      <button onClick={this.handleSubmit}>Go</button>
      </div>
      </div>
    );
  }
});

var Names = React.createClass({
  render: function() {
    return(
        <b>{this.props.names}</b>
    );
  }
});

var ChatItem = React.createClass({
  render: function() {
    return(
        <div className="item">
          <div className="col-md-12">
            <img alt="logo" className="pull-left" src="./src/icon100x100.png" width="40"/>
            <p className="p pull-left"><b>Names: </b> {this.props.text}<br/>{this.props.timer}</p>
            <button className="red pull-right" onClick={this.handleSubmit}><i className="fa fa-trash"></i></button>
          </div>
        </div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {
      // total: [],
      names: [],
      comment: [],
    }
  },
  addComment: function(names, comment){
    this.setState({
      names: this.state.names.concat(names),
      comment: this.state.comment.concat(comment),
    });
  },
  render: function(){
    //var total = this.state.total;
    var names = this.state.names;
    var comment = this.state.comment;
    // var totals = total.concat({
    //   one: chatItem,
    //   two: time,
    // });

    var chatComment = comment.map(function(chat) {
      return (<ChatItem text={chat} key={chat.id} />)
    });
    var chatName = names.map(function(name) {
      return (<Names names={name} key={name.id} />)
    });
    return(
      <div className="col-md-offset-1 col-md-4 me">
        <div>
        <ChatHeader />
        <Input n={names} c={comment} addComment={this.addComment}/>
        <div className="inner">
          {chatComment}
          {chatName}
        </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
