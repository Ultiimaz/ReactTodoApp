import React from 'react';
import './App.css';


class Done extends React.Component {
  constructor(props) {
    super(props);
  }

  onDragOver = () => 
  {
      
  }

  render() {
    const {
      props,
    } = this;

    return (    
      props.list.map((todo,index) =>
      <li className='blockprop' onDragOver={this.onDragOver} key={index}>{todo}</li>
      )
    );
  }
}

export default Done;
  