import React from 'react';
import Course from './view/Course.js';
import './App.css';
import $ from "jquery";

class App extends React.Component {
  constructor() {
    super()
    // this.courseController = new CourseController();
    // this.courseController.addACourse("EAS 2600")
    // this.courseController.addACourse("THI IS THE NEW ONE")
    // this.temp = <Course />;
    // this.courseController.addACourse("Apple Jacks Studios")
    document.body.style = 'background: lightblue;';
    this.state = {
      courses: []
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.courses.map((name) => (
            <Course
              name={name}
              id={this.state.courses.length}
            />
          ))}
        </div>
        <div className="text-center add-course-form">
          <button onClick={this.addNewCourse} className="add-course-button"> + Add a course</button>
          <input id="newCourseName" ></input>
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
