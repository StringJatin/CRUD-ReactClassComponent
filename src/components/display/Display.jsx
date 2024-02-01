import React, { Component } from 'react';
import './Display.css';
import AddIcon from '@mui/icons-material/Add';

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newTask: '',
    };
  }

  handleTaskAdd = () => {
    if(this.state.newTask.trim() !== ""){
        this.setState((prevState) => ({
            data: [...prevState.data, this.state.newTask],
            newTask: '', 
          }));
    }
    else {
        alert("Please Add Task!");
    }
    
  };

  handleOnChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className='heading'>
          <h1>To Do Lists</h1>
        </div>
        <div className='inputTask'>
          <div className='inputTasks'>
            <input type='text' value={this.state.newTask} onChange={this.handleOnChange}></input>
          </div>
          <div className='inputTasks'>
            <button onClick={this.handleTaskAdd}>Add</button>
          </div>
        </div>
        <div className='content'>
          <table>
            {this.state.data.map((task, index) => (
              <tr key={index}>
                <td className='tableData'>{task}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }
}
