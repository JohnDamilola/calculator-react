import React from 'react';
import ReactDOM from 'react-dom';

var Welcome = React.createClass({
  getInitialState: function(){
    return(this.state = {input: "",})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.in);
    this.props.action(input.value)
    this.setState({input:input.value})
  },
  render: function() {
    if (this.state.input==="Hard"){
      var total = 7
    }else if (this.state.input==="Medium"){
      total = 5
    }else if (this.state.input==="Easy"){
      total = 3
    }else {
      total = ""
    }
    if (this.props.score===7){
      var x = (<h4>Game Completed</h4>);
    }else{
      x = ("");
    }
    return(
      <div>
          <h4 className="welcome text-center">Welcome to Slack's typing Game'</h4>
          <h3><b>Score:</b> {this.props.score} of {total}</h3>
           {x}
           <select ref="in" onChange={this.handleSubmit}>
              <option value="----">Choose a level</option>
              <option value="Hard">Hard</option>
              <option value="Medium">Medium</option>
              <option value="Easy">Easy</option>
            </select>
          <hr/>
      </div>
    );
  }
});

var Input = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.in);
    if (input.value!==""){
      this.props.addTodo(input.value);
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

var GameWords = React.createClass({
  render: function() {
    return(
        <div className="item">
          <div className="col-md-12">
            <div>{this.props.words}</div>
          </div>
        </div>
    );
  }
});



var Game = React.createClass({
  getInitialState: function(){
    return {
      words: ['boy','girl','market','internet','sad','gold','maggot'],
      count: 0,
      level: "",
    }
  },
  action: function(item){
    this.setState({level: item})
  },
  addTodo: function(item){
    if (this.state.words.indexOf(item)>=0){
      var n  = this.state.words.indexOf(item);
      delete this.state.words[n];
      this.setState({words:this.state.words});
      this.setState({count:this.state.count+1})
    }
  },
  render: function(){
    if (this.state.level==="Hard"){
      var wor = this.state.words.slice(0,7).map((item, i) => {
        return(
          <span className="btn btn-md btn-rounded col-md-1" key={i}>{item}</span>
      )
      });
    }
    else if (this.state.level==="Medium") {
      wor = this.state.words.slice(0,5).map((item, i) => {
        return(
          <span className="btn btn-md btn-rounded col-md-1" key={i}>{item}</span>
      )
      });
    }
    else if(this.state.level==="Easy"){
      wor = this.state.words.slice(0,3).map((item, i) => {
        return(
          <span className="btn btn-md btn-rounded col-md-1" key={i}>{item}</span>
      )
      });
    }
    else {
        wor = "";
    }

    return(
      <div className="col-md-12">
        <Welcome score={this.state.count} action={this.action}/>
        <div>
        <div className="inners">
          <GameWords words={wor}/>
        </div>
        <Input addTodo={this.addTodo}/>
        </div>
      </div>
    )
  }
});

export default Game;
