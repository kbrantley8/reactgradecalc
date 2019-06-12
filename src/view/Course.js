import React from 'react';
import '../style/Course.css';
import Section from './Section';
import course from '../model/course.js';
import section from '../model/section.js';

function Course () {
    var sect = [];
    for (var i = 0; i < 5; i++) {
        sect.push(new Section())
    }
    var sec = new section("HW", [100, 50], "No", "apple", "apple");
    console.log(sec)
    // var co = new course("Eas");
    // console.log(co)
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
                <tbody>
                    {sect}
                </tbody>
            </table>
        </div>
    );
}

export default Course;