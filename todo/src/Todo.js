import React from 'react';
import './App.css';


const Todo = (props) => {
        return (
            this.props.list.map((todo,index) => 
            {
            <li draggable className='blockprop' onDragStart= {(e)=>this.onDragStart(e,index)}onDragOver={(e)=> this.onDragOver}  key={index}> <a className='textprop'>{todo}</a></li>
            }
            )
        );
    
}

export default Todo;
