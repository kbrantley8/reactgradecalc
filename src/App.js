import React from 'react';
import Course from './view/Course.js';
import './App.css';
import $ from "jquery";
import Section from './view/Section.js';

function App() {
  var temp = new Course();
  var sec = new Section();
  $('#course_table').append(sec);
  return (
    <div className="App">
      {temp}
    </div>
  );
}

export default App;
