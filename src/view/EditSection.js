import React from 'react';
import '../style/Course.css';

import { connect } from 'react-redux';
import { editSection } from '../redux/actions/editSectionActions'

const mapDispatchToProps = dispatch => ({
    editSection: (uniqueId, data) => dispatch(editSection(uniqueId, data))
});
class EditSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            sections: props.sections,
            uniqueId: props.uniqueId,
            section: props.section,
            listOfInputs: [],

            section_name: props.section.name,
            section_grades: {},
            grades_dropped: props.section.dropped,
            section_weight: props.section.weight,
            showNumDropped: props.section.dropped,
            num_dropped: props.section.numDropped
        }
        this.toggleShowEditSectionModal = props.toggleShowEditSectionModal;
        this.calculateAverage = props.calculateAverage;
        for (var grade of props.section.grades) {
            let new_id = "grades" + this.state.listOfInputs.length;
            if (this.state.listOfInputs.length > 0) {
                this.state.listOfInputs.push(<input key={this.state.listOfInputs.length} type="number" className="input-margin" id={new_id} defaultValue={grade} onChange={(e) => this.handleGradeChange(e.target, e.target.value)}></input>)
            } else {
                this.state.listOfInputs.push(<input key={this.state.listOfInputs.length} type="number" id={new_id} defaultValue={grade} onChange={(e) => this.handleGradeChange(e.target, e.target.value)}></input>)
            }
            this.state.section_grades[new_id] = grade;
        }
    }

    editSection = () => {
        let grades_arr = [];
        for (const grade in this.state.section_grades) {
            var value = this.state.section_grades[grade];
            grades_arr.push(value);
        }
        let data = { 
            name: this.state.section_name,
            grades: grades_arr,
            dropped: this.state.grades_dropped,
            numDropped: parseInt(this.state.num_dropped),
            weight: parseInt(this.state.section_weight),
            avg: this.calculateAverage(this.state.section_grades, this.state.num_dropped)
        }
        var temp_sections = this.state.sections
        var arr = [];
        for (var ind in temp_sections) {
            var section = temp_sections[ind]
            if (section === this.state.section) {
                arr.push(data)
            } else {
                arr.push(section)
            }
        }
        const data1 = {
            sections: arr,
        };
        // let db = firebase.firestore();
        // db.collection('courses').doc(this.state.uniqueId).update(data1);
        this.props.editSection(this.state.uniqueId, data1)
        this.toggleShowEditSectionModal();
    }

    handleGradeChange = (target, value) => {
        var new_grades = this.state.section_grades;
        if (value) {
            new_grades[target.id] = parseInt(value);
        } else {
            delete new_grades[target.id]
        }
        this.setState({ section_grades: new_grades })
    }

    addGrade = () => {
        var temp = this.state.listOfInputs;
        let toId = "grades" + temp.length
        temp.push(<input key={this.state.listOfInputs.length} id={toId} type="number" className="input-margin" onChange={(e) => this.handleGradeChange(e.target, e.target.value)}></input>)
        this.setState({listOfInputs: temp})
    }

    loseGrade = () => {
        if (this.state.listOfInputs.length !== 1) {
            var temp = this.state.listOfInputs;
            var item = temp.pop();
            let item_id = item.props.id;
            var new_grades = this.state.section_grades;
            delete new_grades[item_id]
            this.setState({listOfInputs: temp, section_grades: new_grades})
        }
    }

    toggleGradesDropped = (e) => {
        let val = e.target.value;
        if (val === 'true') {
            val = true;
        } else {
            val = false;
        }
        this.setState({ showNumDropped: val, grades_dropped: val, num_dropped: 0})
    }

    render() {
        return (
            <div className="new-section col-sm-6">
                <div>
                    <h1> Edit Section </h1>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label htmlFor="sectionName">Section Name:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" id="sectionName" value={this.state.section_name} onChange={(e)=>this.setState({ section_name: e.target.value })}></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label htmlFor="grades">Grades:</label>
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
                        <label htmlFor="gradesBool">Are any grades dropped?</label>
                    </div>
                    <div className="col-sm-6">
                        <select type="text" id="gradesBool" value={this.state.grades_dropped} onChange={(e) => this.toggleGradesDropped(e)}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>

                    </div>
                </div>
                {(this.state.showNumDropped)
                ?
                <div className="row row-padding" id="numDropped">
                    <div className="col-sm-6">
                        <label htmlFor="gradesNum">If so, how many are dropped?</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" id="gradesNum" value={this.state.num_dropped} onChange={(e) => this.setState({ num_dropped: e.target.value })}></input>
                    </div>
                </div>
                :
                null}
                <div className="row row-padding">
                    <div className="col-sm-6">
                        <label htmlFor="weight">Weight:</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="number" placeholder="%" id="weight" min="0" max="100" value={this.state.section_weight} onChange={(e) => this.setState({ section_weight: e.target.value })}></input>
                    </div>
                </div>
                <div className="row row-padding">
                    <div className="mx-auto">
                        <button onClick={() => this.toggleShowEditSectionModal()} className="align-baseline newSectionButton">Close</button>
                        <button id="editSection" onClick={this.editSection} className="align-baseline newSectionButton">Edit Section</button>
                    </div>
                
                </div>
            </div>
        );
    }
    
}

export default connect(null, mapDispatchToProps)(EditSection);