import React from 'react';
import '../style/Course.css';
import ModalPopup from './ModalPopup';
import { connect } from 'react-redux';
import { deleteCourse } from '../redux/actions/deleteCourseActions'
import { SHOW_COURSE_MODAL } from '../redux/actionTypes';

const mapStateToProps = state => ({
    ...state.modal
})

const mapDispatchToProps = dispatch => ({
    deleteCourse: (uniqueId) => dispatch(deleteCourse(uniqueId)),
    showModal: (uniqueId) => dispatch({ type: SHOW_COURSE_MODAL, payload: uniqueId })
});

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sect: props.sections,
            name: props.name,
            average: props.average,
            uniqueId: props.uniqueId,
            showModalPopup: false
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div className="small-course col-sm-6">
                            <h1 id="course_name" > {this.state.name} 
                                {(!isNaN(this.state.average))
                                ?
                                <p>{this.state.average + "%"}</p>
                                :
                                <p>0%</p>
                                }
                            </h1>
                            <button id="edit_course" className="small-edit-button"
                                onClick={() => this.changeCoursesDisplay()}>Edit</button>
                            <div>
                                <button id="delete_course" className="small-edit-button"
                                    onClick={() => this.handleDeleteCourseClick(this.state.uniqueId)}>Delete</button>
                            </div>
                    </div>
                </div>
                {(this.props.id === this.state.uniqueId) 
                ? 
                <ModalPopup
                    name={this.state.name}
                    average={this.state.average}
                    sections={this.state.sect}
                    uniqueId={this.state.uniqueId}
                />
                :
                null}
            </div>
        );
    }

    handleDeleteCourseClick = () => {
        this.props.deleteCourse(this.state.uniqueId)
    }

    changeCoursesDisplay = () => {
        this.props.showModal(this.state.uniqueId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);