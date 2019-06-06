import React from 'react';
import Course from './view/Course.js';
import './App.css';
// import $ from "jquery";

function App() {
  var course = new Course();
  return (
    <div>
      {course}
    </div>
  );
}

export default App;
