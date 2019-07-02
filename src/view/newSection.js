import React from 'react';
import '../style/Course.css';
import $ from "jquery";
import Section from '../view/Section';
import Course from './Course';

class newSection extends React.Component {
    constructor(props) {
        super(props)
        this.controller = props.ctr;

        this.state = {
            listOfInputs: []
        }
        this.state.listOfInputs.push(<input type="number" id="grades0"></input>)
        this.addGrade = this.addGrade.bind(this)
        this.loseGrade = this.loseGrade.bind(this)
        this.addSection = this.addSection.bind(this);
        this.processClick = this.processClick.bind(this);
    }

    addSection() {
        var sectionName = $("#sectionName").val()
        var gradesBool = $("#gradesBool").val()
        var gradesNum = $("#gradesNum").val()
        var weight = $("#weight").val()
        weight = weight + "%"
        var courseName = $("#course_name").val()
        var grades = [];
        if (gradesNum == "") {
            gradesNum = "N/A"
        }
        for (var i = 0; i < this.state.listOfInputs.length; i++) {
            var toGet = "#grades" + i;
            var num = $(toGet).val()
            grades.push(num)
        }
        let props = { 
            name: sectionName,
            grades: grades,
            dropped: gradesBool,
            numDropped: gradesNum,
            weight: weight
        }
        
        var sec = <Section {...props}/>;
        this.props.ctr(sec);
        // var cour = new Course()
        // console.log(cour)
        // console.log(this.controller)
        // console.log("GOT HERE")
    }

    addGrade() {
        var temp = this.state.listOfInputs;
        var newID = "grades" + temp.length;
        temp.push(<input type="number" className="input-margin" id={newID}></input>)
        this.setState({listOfInputs: temp})
    }

    loseGrade() {
        var temp = this.state.listOfInputs;
        temp.pop()
        this.setState({listOfInputs: temp})
    }

    processClick() {
        var choice = $("#gradesBool").children("option:selected").val();
        if (choice == "Yes") {
            $("#numDropped").attr("hidden", false)
        } else {
            $("#numDropped").attr("hidden", true)
        }
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
                        {this.state.listOfInputs}
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                    </div>
                    <div className="col-sm-6">
                        <button onClick={this.loseGrade}> <b>-</b> </button>
                        <button onClick={this.addGrade}> <b>+</b> </button>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label for="gradesBool">Are any grades dropped?</label>
                    </div>
                    <div className="col-sm-6">
                        <select type="text" id="gradesBool" onChange={this.processClick}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>

                    </div>
                </div>
                <div className="row row-padding" id="numDropped" hidden>
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
                        <input type="number" placeholder="%" id="weight" min="0" max="100"></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="mx-auto">
                        <button id="addSection" onClick={this.addSection} className="align-baseline newSectionButton">Add a Section</button>
                    </div>
                
                </div>
            </div>
        );
    }
    
}

export default newSection;