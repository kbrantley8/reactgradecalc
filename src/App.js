import React from 'react';
import Course from './view/Course.js';
import './App.css';
import AddSection from './view/newSection.js';
import CourseController from './controller/courseController.js';
// import $ from "jquery";

class App extends React.Component {
  constructor() {
    super()
    this.courseController = new CourseController();
    // this.courseController.addACourse("Apple Jacks Studios")
    document.body.style = 'background: lightblue;';
  }

  render() {
    return (
      <div>
        <Course ctr={this.courseController} />
      </div>
    );
  }
  
}

export default App;
