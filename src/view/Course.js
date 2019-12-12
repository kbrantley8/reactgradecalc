import React from 'react';
import '../style/Course.css';
import AddSection from './newSection.js';
import $ from "jquery";
import firebase from '../firebase.js';
import { thisExpression } from '@babel/types';

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sect: props.sections,
            name: props.name,
            average: 0,
            id: props.uniqueId,
            reRender: false
        }
        this.forceReRender = this.forceReRender.bind(this);
        // for (var i = 0; i < 5; i++) {
        //     this.state.sect.push(new Section())
        // }
        // var sec = new section("HW", [100, 50], "No", "apple", "apple");
        // var cour = new course("Apple")
    }

    forceReRender() {
        this.setState({reRender: true})
    }

    render() {
        var divNum = "course_div" + this.state.id;
        var smallCourseDiv = "smallCourseDisplay" + this.state.id;
        var average = 0;
        this.state.sect.forEach((section) => {
            average = average + ((section.weight / 100) * section.avg)
        })
        return (
            <div>
                <div id={smallCourseDiv}>
                    <div className="small-course col-sm-6">
                            <h1 id="course_name" > {this.state.name} 
                                <p>{average + "%"}</p>
                            </h1>
                            <button id="edit_course" className="small-edit-button"
                                onClick={() => this.changeCoursesDisplay(this.state.id)}>Edit</button>
                    </div>
                </div>
                <div className="change-course-display" id={divNum}>
                    <div className="course-main">
                        <div>
                            <h1 id="course_name" > {this.state.name} 
                                <p>{average + "%"}</p>
                                <button id="save_course" className="big-save-button"
                                onClick={() => this.changeCoursesDisplay(this.state.id)}>Save</button>
                            </h1>
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
                            <tbody className="table-row">
                                {this.state.sect.map((section, index) => (
                                    <tr onClick={() => this.deleteRow(section)}>
                                        <td>{section.name}</td>
                                        <td>{(() => {
                                            var toRet = ""
                                            for (var i = 0; i < section.grades.length; i++) {
                                                if (i == 0) {
                                                    toRet = toRet + section.grades[i]
                                                } else {
                                                    toRet = toRet + ", " + section.grades[i]
                                                }
                                            }
                                            return toRet
                                        }) ()}</td>
                                        <td>{(() => {
                                            if (section.dropped) {
                                                return "Yes"
                                            } else {
                                                return "No"
                                            }
                                        }) ()}</td>
                                        <td>{section.numDropped}</td>
                                        <td>{section.weight}</td>
                                        <td>{section.avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="add-new-section-button">
                            <button id="addNewSectionDisplay" onClick={() => this.changeAddSectionDisplay(divNum)}>+ Add a new Section</button>
                        </div>
                    </div>
                    <div className="add-section-display">
                        <AddSection ctr={this.forceReRender} uniqueId={this.state.id} name={this.state.name} sections={this.state.sect} changeDisplay={this.changeAddSectionDisplay}/>
                    </div>
                </div>
            </div>
        );
    }

    deleteRow = (event) => {
        var sections = this.state.sect;
        var arr = [];
        sections.forEach((section) => {
            if (section != event) {
                arr.push(section)
            }
        })
        console.log(arr)
        let db = firebase.firestore();
        let addDoc = db.collection('courses').doc(this.state.id).update({sections: arr});
        this.setState({sect: arr})
    }

    changeCoursesDisplay = (courseid) => {
        var divNum = "course_div" + courseid;
        var smallCourseDiv = "smallCourseDisplay" + courseid;
        var courseid = "#" + divNum;
        var smallCourseid = "#" + smallCourseDiv;
        var courseToSee = $(courseid)
        var smallCourseToSee = $(smallCourseid);
        var displayOption = courseToSee.is(':visible')
        if (displayOption) {
            courseToSee.hide()
            smallCourseToSee.show()
        } else {
            courseToSee.show()
            courseToSee.find(".add-section-display").hide()
            courseToSee.find("#addNewSectionDisplay").show()
        }
    }

    changeAddSectionDisplay = (courseid) => {
        var courseid = "#" + courseid;
        var courseToSee = $(courseid)
        var displayOption = courseToSee.find(".add-section-display").is(':visible')
        if (displayOption) {
            courseToSee.find(".add-section-display").hide()
            courseToSee.find("#addNewSectionDisplay").show()
        } else {
            courseToSee.find(".add-section-display").show()
            courseToSee.find("#addNewSectionDisplay").hide()
        }
    }
}

export default Course;