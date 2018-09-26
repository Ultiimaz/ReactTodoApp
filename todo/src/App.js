import React, { Component } from 'react';
import './style/App.css';
import './style/container.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isModalRequested: false,
      todo: [],
      doing: [],
      done: [],
      currentValue: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Submit = this.handleSubmit.bind(this);
  }
 
  taskChange = (index,task, value,receiver) => 
  {
    switch(receiver)
    {     //pushes value to new array
      case "todo": 
      {
         var todo = this.state.todo;
         todo.push(value);
        this.setState({todo});
        break;
      }
      case "doing": 
      {
        var doing = this.state.doing;
        doing.push(value);
        this.setState({doing});
        break;
      }
      case "done":
      {
        var done = this.state.done;
        done.push(value);
        this.setState({done});
        break;
      }
      default: 
      {
        console.log("error occured!");
      }
    }
    switch(task) 
    { // removes items after the new value is set!
      case "todo": 
      {
        let newTodo = this.state.todo;
        delete newTodo[index];
        
        this.setState({todo:newTodo});
        break;
      }
      case "doing": 
      {
        let newTodo = this.state.doing;
        delete newTodo[index];
        
        this.setState({doing:newTodo});
 
        break;
      }
      case "done":
      {
        var newTodo = this.state.done;
        delete newTodo[index];
        
        this.setState({done:newTodo});
        break;
      }
      default: 
      {
        console.log("error occured!");
      }
    }
    
    this.setState({box: value});

  }
  drop = (ev,receiver) => {
 
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("text/plain"));
    var box = data.box;
    var index = data.index;
    this.taskChange(index,box,data.value,receiver);
    
  }

  onDragStart = (event, index) => {
    index = JSON.stringify(index);
    event.dataTransfer.setData("text/plain", index);
  
    

  }
  allowDrop = (event) => {
    event.preventDefault();
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const currentValue = this.state.currentValue;
    if(currentValue === null || currentValue === "")
    {
      return;
    }

    this.setState({
      todo: [...this.state.todo, this.state.currentValue.trim()]
    });
  }
  render() {
    return (
      <div className="App">
       
        <div className='todoApp'>
       
        { 
        this.state.isModalRequested?
        <div class='modal'>
          <div className='modal-inner'>
          <button className="close" onClick={()=>this.setState({isModalRequested:false})}>x</button>
            <form onSubmit={this.handleSubmit}>
              <input type="text" class="formText"onChange={this.handleInputChange} name='currentValue' value={this.state.currentValue} />
              <input type="submit" class="formSubmit"/>
            </form>
          </div>
        </div>:''
      }
          <div className='box' onDrop={(ev) => this.drop(ev,"todo")} onDragOver={this.allowDrop}>
            <ul>
              <a className='label'>Todo</a>
              {this.state.todo.map((todo, index) =>

  <li draggable className='blockprop' onDragStart={(e) => this.onDragStart(e, { index, box: "todo",value: todo })} onDragOver={(e) => this.onDragOver} key={index}> <a className='textprop' >{todo}</a></li>

              )}
            </ul>
          </div>
          <div className='box' onDrop={(ev) => this.drop(ev,"doing")} onDragOver={this.allowDrop}>
            <ul>
              <a className='label'>Doing</a>
              {this.state.doing.map((todo, index) =>

                <li draggable className='blockprop' onDragStart={(e) => this.onDragStart(e, { index, box: "doing",value: todo })} onDragOver={(e) => this.onDragOver} key={index}> <a className='textprop' >{todo}</a></li>

              )}
            </ul>
          </div>
          <div className='box' onDrop={(ev) => this.drop(ev,"done")} onDragOver={this.allowDrop}>
            <ul>
              <a className='label'>Done</a>
              {this.state.done.map((todo, index) =>
                <li draggable className='blockprop' onDragStart={(e) => this.onDragStart(e, { index, box: "done",value: todo })} onDragOver={(e) => this.onDragOver} key={index}> <a className='textprop' >{todo}</a></li>
              )}
            </ul>
          </div>

        </div>
        <button onClick={()=>this.setState({isModalRequested:true})}>Add new item!</button>
      </div>
    );
  }
}

export default App;
