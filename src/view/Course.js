import React from 'react';
import ReactDOM from 'react-dom'
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
        // this.controller = props.ctr;

        this.state = {
            sect: [],
            name: props.name
        }
        this.changeName = this.changeName.bind(this);
        this.myCallBack = this.myCallBack.bind(this);
        // for (var i = 0; i < 5; i++) {
        //     this.state.sect.push(new Section())
        // }
        // var sec = new section("HW", [100, 50], "No", "apple", "apple");
        // var cour = new course("Apple")
    }

    changeName() {
        var newName = (this.state.name == "EAS 2600 - Intro to Rocks") ? "CS 3600 - Intro to AI" : "EAS 2600 - Intro to Rocks";
        this.setState({name: newName})
        console.log($("#addSection"))
        $("#addSection").text("APpleJacks Please")
    }

    myCallBack(info) {
        var temp = this.state.sect
        temp.push(info)
        this.setState({sect: temp})
    }

    render() {
        return (
            <div>
                <div id="course_div" className="course-main">
                    <div>
                        <h1 id="course_name" > {this.state.name} </h1>             
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
                <AddSection ctr={this.myCallBack}/>
                <button onClick={this.changeName}>
                    APPLE JACKS BUTTON
                </button>
            </div>
        );
    }
}

export default Course;