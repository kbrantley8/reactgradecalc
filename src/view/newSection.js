import React from 'react';
import '../style/Course.css';
import $ from "jquery";
import section from '../model/section';
import Course from './Course';

class newSection extends React.Component {
    constructor(props) {
        super(props)
        this.controller = props.ctr;

        this.addSection = this.addSection.bind(this);
    }

    addSection() {
        // var sectionName = $("#sectionName").val()
        // var grades = $("#grades").val()
        // var gradesBool = $("#gradesBool").val()
        // var gradesNum = $("#gradesNum").val()
        // var weight = $("#weight").val()
        // var sec = new section(sectionName, grades,gradesBool, gradesNum, weight);
        // var cour = new Course()
        // console.log(cour)
        // console.log(this.controller)
        this.controller.rename("ap", "b")
        console.log("GOT HERE")
    }

    render() {
        return (
            <div className="new-section col-sm-6">
                <div>
                    <h1> Add a Section </h1>             
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="sectionName">Section Name:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" id="sectionName"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="grades">Grades:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="number" id="grades"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="gradesBool">Are any grades dropped?</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" id="gradesBool"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="gradesNum">If so, how many are dropped?</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" id="gradesNum"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="weight">Weight:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="number" id="weight" min="0" max="100"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="mx-auto">
                        <button id="addSection" onClick={this.addSection} className="align-baseline">Add a Section</button>
                    </div>
                
                </div>
            </div>
        );
    }
    
}

export default newSection;