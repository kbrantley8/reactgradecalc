import React from 'react';
import '../style/Course.css';
import Section from './Section';
import course from '../model/course.js';
import section from '../model/section.js';
import courseController from '../controller/courseController.js';
import $ from "jquery";
import AddSection from './newSection.js';

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.controller = props.ctr;

        this.state = {
            sect: [],
            name: "acura"
        }
        for (var i = 0; i < 5; i++) {
            this.state.sect.push(new Section())
        }
        // var sec = new section("HW", [100, 50], "No", "apple", "apple");
        // var cour = new course("Apple")
    }

    render() {
        return (
            <div>
                <div id="course_div" className="course-main">
                    <div>
                        <h1 id={this.state.name} > EAS 2600 - Intro to Earth Science </h1>             
                    </div>
        
                    <table id="course_table">
                        <tr>
                            <th>Section</th>
                            <th>Grades</th>
                            <th>Dropped?</th>
                            <th>How many are dropped?</th>
                            <th>Weight</th>
                            <th>Average</th>
                        </tr>
                        <tbody>
                            {this.state.sect}
                        </tbody>
                    </table>
                </div>
                <AddSection ctr={this.controller}/>
            </div>
        );
    }
}

export default Course;