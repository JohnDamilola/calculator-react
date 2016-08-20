import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import './styles/index2.css';
import './styles/bootstrap.css';
import './styles/materialdesignicons.min.css';
import './styles/font-awesome.css';
import './icon100x100.png';


var Main = React.createClass({
  getInitialState: function(){
    return {
      username: [],
      comment: [],
      val: false,
      total: [],
    }
  },
  handleChange: function(e){
    e.getPreventdefault();
    // var total = {one:"",two:"",};
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var comment = ReactDOM.findDOMNode(this.refs.comment).value;
    this.setState({
      username: this.state.username.concat(username),
      comment: this.state.comment.concat(comment),
      val: true,
    });
    var total = [];
    total.push({
      one: this.state.username,
      two: this.state.comment,
    })
    this.setState({total})
    username="";
    comment="";
  },
  render: function(){
    if (this.state.val===true){
      var commentItem = this.state.total.map(function(x){
        return (<p>{x.one}<br/>{x.two}</p>);
      })
    }else{
      commentItem = (<hr/>);
      return(
        <div className="col-md-offset-1 col-md-4 me">
          <p>{commentItem}</p>
          <hr/>
          <form onSubmit={this.handleChange.bind(this)}>
              <input className="form-control" type="text" ref="username" placeholder="Username"  />
              <br/>
              <input className="form-control" ref="comment" placeholder="Enter Comment here" />
              <button>Add</button>
          </form>
        </div>
      )
    }
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
