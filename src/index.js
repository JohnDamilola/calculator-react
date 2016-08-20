import React from 'react';
import ReactDOM from 'react-dom';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import './styles/index2.css';
import './styles/bootstrap.css';
import './styles/materialdesignicons.min.css';
import './styles/font-awesome.css';
import './icon100x100.png';

var CalculatorDisplay = React.createClass({
  handleChange: function(){
    var input = ReactDOM.findDOMNode(this.refs.in).value;
    this.props.input = parseInt(input,10);
    this.props.addNumber(this.props.input);
  },
  render: function() {
    return(
      <div className="display">
      <ReactCSSTransitionGroup transitionName="example"
               transitionAppear={true} transitionAppearTimeout={5000}
               transitionEnter={false} transitionLeave={false}>
                 <input disabled type="text" value={this.props.input} ref="in" onChange={this.handleChange} className="input"/>
            </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var CalculatorButton = React.createClass({
  handleClick: function(event){
      var target = event.target;
      var number = target.innerHTML;
      var newState = number;
      this.props.buttonInput(newState)
      //this.setState({input: newState});
  },
  handleCancel: function(event){
      this.props.cancel()
  },
  handleMath: function(event){
    var sign = event.target.innerHTML;
    if (sign==="+"){
      this.props.add()
    }
    else if (sign==="-") {
      this.props.minus()
    }
    else if (sign==="*") {
      this.props.multiply()
    }
    else if (sign==="/") {
      this.props.divide()
    }

  },
  handleResult: function(){
      this.props.result()
  },
  render: function() {
    return(
      <div className="">
        <button onClick={this.handleCancel} className="btns-digit">C</button>
        <button className="btns-digit">+/-</button>
        <button onClick={this.handleMath} className="btns-digit">%</button>
        <button onClick={this.handleMath} className="btns-special">/</button>
        <button onClick={this.handleClick} className="btns-digit">7</button>
        <button onClick={this.handleClick} className="btns-digit">8</button>
        <button onClick={this.handleClick} className="btns-digit">9</button>
        <button onClick={this.handleMath} className="btns-special">*</button>
        <button onClick={this.handleClick} className="btns-digit">4</button>
        <button onClick={this.handleClick} className="btns-digit">5</button>
        <button onClick={this.handleClick} className="btns-digit">6</button>
        <button onClick={this.handleMath} className="btns-special">-</button>
        <button onClick={this.handleClick} className="btns-digit">1</button>
        <button onClick={this.handleClick} className="btns-digit">2</button>
        <button onClick={this.handleClick} className="btns-digit">3</button>
        <button onClick={this.handleMath} className="btns-special">+</button>


        <button onClick={this.handleClick} className="btns-long">0</button>
        <button onClick={this.handleClick} className="btns-digit">.</button>
        <button onClick={this.handleResult} className="btns-special">=</button>
      </div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return(
        this.state = {
          input: 0,
          initial: 0,
          final: 0,
        }
    )
  },
  addNumber: function(item){
    this.setState({input:item})
  },
  buttonInput: function(item){
    this.setState({input:this.state.input + item})
  },
  cancel: function(){
    var l = this.state.input.length;
    var input = this.state.input.substring(0,l-1);
    this.setState({input})
  },
  add: function(){
    var initial = this.state.input;
    this.setState({
      initial,
      input: "",
      sign: "+"
    })
  },
  minus: function(){
    var initial = this.state.input;
    this.setState({
      initial,
      input: "",
      sign: "-"
    })
  },
  multiply: function(){
    var initial = this.state.input;
    this.setState({
      initial,
      input: "",
      sign: "*"
    })
  },
  divide: function(){
    var initial = this.state.input;
    this.setState({
      initial,
      input: "",
      sign: "/"
    })
  },
  result: function(){
    var initial = parseInt(this.state.initial,10);
    var input = parseInt(this.state.input,10);
    var sign = this.state.sign;
    if (sign === "+"){
      this.setState({input:initial + input})
    }
    else if (sign === "-") {
      this.setState({input:initial - input})
    }
    else if (sign === "*") {
      this.setState({input:initial * input})
    }
    else if (sign === "/") {
      this.setState({input:initial / input})
    }
  },
  render: function() {
    return(
      <div className="me">
        <CalculatorDisplay input={this.state.input} addNumber={this.addNumber} />
        <CalculatorButton  add={this.add} minus={this.minus}
        multiply={this.multiply} divide={this.divide} result={this.result}
        cancel={this.cancel} buttonInput={this.buttonInput}
        input={this.state.input} />
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
