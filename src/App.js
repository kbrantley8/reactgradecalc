import React from 'react';
import Course from './view/Course.js';
import './App.css';
import $ from "jquery";

class App extends React.Component {
  constructor() {
    super()
    document.body.style = 'background: lightblue;';
    this.state = {
      courses: []
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="text-center grade-calc-title">Grade Calculator</h1>
          <hr className="line-title"></hr>
        </div>
        <div className="text-center add-course-form">
          <button onClick={this.addNewCourse} className="add-course-button"> + Add a course</button>
          <input id="newCourseName" ></input>
        </div>
        <div className="text-center list-of-courses">
          {this.state.courses.map((name) => (
            <Course
              name={name}
              id={this.state.courses.length}
            />
          ))}
        </div>
      </div>
      
    );
  }

  addNewCourse = () => {
    var name = $("#newCourseName").val();
    if (name != "") {
      var list = this.state.courses;
      list.push(name)
      $("#newCourseName").val("")
      this.setState({courses: list})
    }
  }
  
}

export default App;
