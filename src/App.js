import React from 'react';
import Course from './view/Course.js';
import './App.css';
import newSection from './view/newSection.js';
// import $ from "jquery";

function App() {
  var course = new Course();
  var newsection = new newSection();
  document.body.style = 'background: lightblue;';
  return (
    <div>
      {course}
      {newsection}
    </div>
  );
}

export default App;
