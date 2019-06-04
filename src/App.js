import React from 'react';
import Course from './view/Course.js';
import './App.css';

function App() {
  var temp = new Course();
  return (
    <div className="App">
      {temp}
    </div>
  );
}

export default App;
