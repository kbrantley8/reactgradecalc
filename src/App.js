import React from 'react';
import Course from './view/Course.js';
import './App.css';
import AddSection from './view/newSection.js';
import CourseController from './controller/courseController.js';
// import $ from "jquery";

class App extends React.Component {
  constructor() {
    super()
    // this.courseController = new CourseController();
    // this.courseController.addACourse("EAS 2600")
    // this.courseController.addACourse("THI IS THE NEW ONE")
    // this.temp = <Course />;
    // this.courseController.addACourse("Apple Jacks Studios")
    document.body.style = 'background: lightblue;';
  }

  render() {
    return (
      <div>
        <Course name = {"EAS 2600 - Intro to Rocks"}/>
      </div>
      
    );
  }
  
}

export default App;
