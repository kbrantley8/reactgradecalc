import React from 'react';
import Course from './view/Course.js';
import './App.css';
import firebase from './firebase.js';

class App extends React.Component {
  constructor() {
    super()
    document.body.style = 'background: lightblue;';
    this.state = {
      new_course_name: "",
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
    return (
      <div>
        <div>
          <h1 className="text-center grade-calc-title">Grade Calculator</h1>
          <hr className="line-title"></hr>
        </div>
        <div className="text-center add-course-form">
          <button onClick={this.addNewCourse} className="add-course-button"> + Add a course</button>
          <input id="newCourseName" value={this.state.new_course_name} onChange={(e) => this.setState({ new_course_name: e.target.value })}></input>
        </div>
        <div className="text-center list-of-courses">
          {this.state.courses.map((course, index) => (
            <Course
              key={course.uniqueId}
              name={course.name}
              sections={course.sections}
              uniqueId={course.uniqueId}
              handleDeleteCourseClick={this.deleteCourse}
            />
          ))}
        </div>
      </div>
      
    );
  }

  addNewCourse = () => {
    var name = this.state.new_course_name;
    if (name !== "") {
      const uuidv4 = require('uuid/v4');
      var uniqueId = uuidv4();
      const data = {
        name: name,
        sections: [],
        uniqueId: uniqueId
      };
		  let db = firebase.firestore();
      db.collection('courses').doc(data.uniqueId).set(data);
      var arr = this.state.courses;
      arr.push(data);
      this.setState({ courses: arr, new_course_name: "" });
    }
  }

  deleteCourse = (uniqueId) => {
    let db = firebase.firestore();
    db.collection('courses').doc(uniqueId).delete();
    var courses = this.state.courses;
    var new_courses = [];
    for (let index in courses) {
      var course = courses[index]
      if (course.uniqueId !== uniqueId) {
        new_courses.push(course)
      }
    }
    this.setState({ courses: new_courses })
  }
  
}

export default App;
