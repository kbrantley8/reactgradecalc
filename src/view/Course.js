import React from 'react';
import '../style/Course.css';

function Course () {
    return (
        <div id="course_div" className="course-main">
            <div>
                <h1> EAS 2600 - Rocks For Jocks </h1>             
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
            </table>
        </div>
    );
}

export default Course;