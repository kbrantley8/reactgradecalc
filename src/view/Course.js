import React from 'react';
import '../style/Course.css';
import AddSection from './newSection.js';
import $ from "jquery";

class Course extends React.Component {
    constructor(props) {
        super(props);
        // this.controller = props.ctr;

        this.state = {
            sect: [],
            name: props.name,
            average: 0,
            id: props.id
        }
        this.myCallBack = this.myCallBack.bind(this);
        // for (var i = 0; i < 5; i++) {
        //     this.state.sect.push(new Section())
        // }
        // var sec = new section("HW", [100, 50], "No", "apple", "apple");
        // var cour = new course("Apple")
    }

    myCallBack(info) {
        var temp = this.state.sect
        temp.push(info)
        var val = temp[this.state.sect.length - 1].props["weight"]
        var val1 = temp[this.state.sect.length - 1].props["grades"]
        var val2 = temp[this.state.sect.length - 1].props["numDropped"]
        if (val2 == 'N/A') {
            val2 = 0;
        }
        var sum = 0;
        var tempArr = []
        for (var i = 0; i < val1.length; i++){
            tempArr.push(parseInt(val1[i]));
            sum += parseInt(val1[i]);
        }
        tempArr.sort(function(a, b){return a-b});
        for (var i = 0; i < val2; i++) {
            sum -= tempArr[i]
        }
        console.log(sum)
        var avg = Math.round(((sum / (val1.length - val2)) * 10) / 10);
        val = val.substring(0, val.length - 1)
        // var wei = parseInt(val);
        var tem = avg * (val / 100);
        var newAvg = this.state.average + tem;
        this.setState({average: newAvg})
        this.setState({sect: temp})
    }

    render() {
        var divNum = "course_div" + this.state.id;
        var smallCourseDiv = "smallCourseDisplay" + this.state.id;
        return (
            <div>
                <div id={smallCourseDiv}>
                    <div className="small-course col-sm-6">
                            <h1 id="course_name" > {this.state.name} 
                                <p>{this.state.average + "%"}</p>
                            </h1>
                            <button id="edit_course" className="small-edit-button"
                                onClick={() => this.changeCoursesDisplay(this.state.id)}>Edit</button>
                    </div>
                </div>
                <div className="change-course-display" id={divNum}>
                    <div className="course-main">
                        <div>
                            <h1 id="course_name" > {this.state.name} 
                                <p>{this.state.average + "%"}</p>
                                <button id="edit_course" className="big-save-button"
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
                            <tbody>
                                {this.state.sect}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <button id="addNewSectionDisplay" onClick={() => this.changeAddSectionDisplay(divNum)}>+ Add a new Section</button>
                    </div>
                    <div className="add-section-display">
                        <AddSection ctr={this.myCallBack} id={this.state.id} changeDisplay={this.changeAddSectionDisplay}/>
                    </div>
                </div>
            </div>
        );
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