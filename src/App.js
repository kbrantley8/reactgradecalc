import React from 'react';
import Course from './view/Course.js';
import './App.css';
import { connect } from 'react-redux';
import { loadCourses } from './redux/actions/loadCourseActions'
import { addCourse } from './redux/actions/addCourseActions'

const mapStateToProps = state => ({
    ...state.course_list
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(loadCourses()),
    addCourse: (name) => dispatch(addCourse(name))
});

class App extends React.Component {
  constructor(props) {
    super(props)
    document.body.style = 'background: lightyellow;';
    this.state = {
      new_course_name: ""
    }
  }
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="text-center grade-calc-title">Grade Calculator</h1>
          <hr className="line-title"></hr>
        </div>
        {
          (this.props.loading) ?
          <h1 style={{ textAlign: 'center' }}>Loading...</h1>
          :
          <div>
            <div className="text-center add-course-form">
              <button onClick={this.addNewCourse} className="add-course-button"> + Add a course</button>
              <input id="newCourseName" value={this.state.new_course_name} onChange={(e) => this.setState({ new_course_name: e.target.value })}></input>
            </div>
            <div className="text-center list-of-courses">
              {this.props.course_list.map((course, index) => (
                <Course
                  key={course.uniqueId}
                  name={course.name}
                  sections={course.sections}
                  average={course.average}
                  uniqueId={course.uniqueId}
                />
              ))}
            </div>
          </div>
        }
      </div>
      
    );
  }

  addNewCourse = () => {
    this.props.addCourse(this.state.new_course_name)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
