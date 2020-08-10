import React from 'react';
import '../style/Course.css';
import ModalPopup from './ModalPopup';

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sect: props.sections,
            name: props.name,
            average: 0,
            uniqueId: props.uniqueId,
            showModalPopup: false
        }
        this.handleDeleteCourseClick = props.handleDeleteCourseClick;
    }

    componentDidMount() {
        this.updateCourse(this.state.sect);
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
                {(this.state.showModalPopup) 
                ? 
                <ModalPopup
                    name={this.state.name}
                    average={this.state.average}
                    sections={this.state.sect}
                    uniqueId={this.state.uniqueId}
                    handleUpdateCourse={this.updateCourse}
                    handleSaveClick={this.changeCoursesDisplay}
                />
                :
                null}
            </div>
        );
    }

    updateCourse = (sections) => {
        let tops = 0;
        let weights = 0;
        sections.forEach((section) => {
            tops += section.weight * section.avg;
            weights += section.weight;
        })
        let average = (tops/weights).toFixed(2);
        this.setState({ average: average, sect: sections })
        return average;
    }

    changeCoursesDisplay = () => {
        if (this.state.showModalPopup) {
            this.setState({showModalPopup: false})
        } else {
            this.setState({showModalPopup: true})
        }
    }
}

export default Course;