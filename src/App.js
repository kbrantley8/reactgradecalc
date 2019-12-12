import React from 'react';
import Course from './view/Course.js';
import './App.css';
import firebase from './firebase.js';
import $ from "jquery";

class App extends React.Component {
  constructor() {
    super()
    document.body.style = 'background: lightblue;';
    this.state = {
      courses: [],
    }
  }

  async componentDidMount() {
    var arr = []
    firebase
        .firestore()
        .collection("courses")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({
                  name: doc.data().name,
                  sections: doc.data().sections,
                  uniqueId: doc.id
                })
            });
            this.setState({courses: arr})
        });
  }

  render() {
    // this.state.courses.map((course) => {
    //    course.sections.forEach((section) => {
    //      console.log(section)
    //    })
    // })
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
          {this.state.courses.map((course, index) => (
            <Course
              name={course.name}
              sections={course.sections}
              uniqueId={course.uniqueId}
            />
          ))}
        </div>
      </div>
      
    );
  }

  addNewCourse = () => {
    var name = $("#newCourseName").val();
    if (name != "") {
      const uuidv4 = require('uuid/v4');
      var uniqueId = uuidv4();
      const data = {
        name: name,
        sections: [],
        uniqueId: uniqueId
      };
		  let db = firebase.firestore();
      let addDoc = db.collection('courses').doc(data.uniqueId).set(data);
      var arr = this.state.courses;
      arr.push(data);
      this.setState({courses: arr});
    }
  }
  
}

export default App;
