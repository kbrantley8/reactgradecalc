import React from 'react';
import AddSection from '../view/newSection'
import EditSection from '../view/EditSection'
import { connect } from 'react-redux';
import { HIDE_COURSE_MODAL } from '../redux/actionTypes';
import { deleteSection } from '../redux/actions/deleteSectionActions'

const mapStateToProps = state => ({
    ...state.modal
})

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch({ type: HIDE_COURSE_MODAL }),
    deleteSection: (uniqueId, data) => dispatch(deleteSection(uniqueId, data))
});
class ModalPopup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name,
            average: props.average,
            sections: props.sections,
            uniqueId: props.uniqueId,
            showAddSectionModal: false,
            showEditSectionModal: false
        }
    }
    
    render() {
        return (
            <div className="change-course-display">
                <div className="course-main">
                    <div>
                        <h1 id="course_name" > {this.state.name} 
                                {(!isNaN(this.state.average))
                                ?
                                <p>{this.state.average + "%"}</p>
                                :
                                <p>0%</p>
                                }
                            <button id="save_course" className="big-save-button"
                            onClick={() => this.props.hideModal()}>Save</button>
                        </h1>
                    </div>
        
                    <table id="course_table">
                        <tbody>
                            <tr>
                                <th>Section</th>
                                <th>Grades</th>
                                <th>Dropped?</th>
                                <th>How many are dropped?</th>
                                <th>Weight</th>
                                <th>Average</th>
                                <th>Options</th>
                            </tr>
                        </tbody>
                        <tbody className="table-row">
                            {this.state.sections.map((section, index) => (
                                <tr key={index}>
                                    <td>{section.name}</td>
                                    <td>{(() => {
                                        var toRet = ""
                                        for (var i = 0; i < section.grades.length; i++) {
                                            if (i === 0) {
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
                                    <td>{section.avg.toFixed(2)}%</td>
                                    <td>
                                        <button onClick={() => this.handleEditSectionClick(section)}>Edit</button>
                                        <button onClick={() => this.handleDeleteSectionClick(section)} style={{ marginLeft: '5px' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="add-new-section-button">
                        <button id="addNewSectionDisplay" onClick={() => this.toggleShowAddSectionModal()}>+ Add a new Section</button>
                    </div>
                </div>
                {(this.state.showAddSectionModal)
                ?
                <AddSection
                    uniqueId={this.state.uniqueId}
                    name={this.state.name}
                    sections={this.state.sections}
                    toggleShowAddSectionModal={this.toggleShowAddSectionModal}
                    calculateAverage={this.calculateAverage}
                />
                :
                null}
                {(this.state.showEditSectionModal)
                ?
                <EditSection
                    uniqueId={this.state.uniqueId}
                    name={this.state.name}
                    sections={this.state.sections}
                    section={this.state.sectionToEdit}
                    toggleShowEditSectionModal={this.toggleShowEditSectionModal}
                    calculateAverage={this.calculateAverage}
                />
                :
                null}
            </div>
        );
    }

    calculateAverage = (grades, num_dropped = 0) => {
        if (num_dropped > 0) {
            if (num_dropped >= grades.length) {
                return 100;
            }
            let grades_arr = [];
            for (const grade in grades) {
                var val = grades[grade];
                grades_arr.push(val);
            }
            var new_arr_grades = grades_arr.sort(function(a, b) { return a - b });
            var arr_to_compare = [];
            for (var i = num_dropped; i < grades_arr.length; i++) {
                arr_to_compare.push(new_arr_grades[i])
            }
            var sum = 0;
            var count = 0;
            for (const grade in arr_to_compare) {
                var value = arr_to_compare[grade];
                sum += value;
                count++;
            }
            var average = (count === 0) ? 100 : sum / count
            return average;

        } else {
            let sum = 0;
            let count = 0;
            for (const grade in grades) {
                let value = grades[grade];
                sum += value;
                count++;
            }
            let average = sum / count;
            return average;
        }
    }

    handleEditSectionClick = (section) => {
        if (!this.state.showAddSectionModal) {
            this.setState({ sectionToEdit: section, showEditSectionModal: !this.state.showEditSectionModal })
        }
    }

    handleDeleteSectionClick = (section) => {
        var all_sections = this.state.sections;
        let arr = [];
        all_sections.forEach((val) => {
            if (val !== section) {
                arr.push(val)
            }
        })
        this.props.deleteSection(this.state.uniqueId, arr)
    }

    toggleShowAddSectionModal = () => {
        if (!this.state.showEditSectionModal) {
            this.setState({ showAddSectionModal: !this.state.showAddSectionModal })
        }
    }

    toggleShowEditSectionModal = () => {
        this.setState({ showEditSectionModal: !this.state.showEditSectionModal })
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPopup);