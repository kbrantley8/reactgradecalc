import Course from "../view/Course";
import course from "../model/course";
import sectionController from "./sectionController.js";
import $ from "jquery";
import section from "../model/section.js";
import ReactDOM from 'react-dom';
import React from 'react';

var courseController = function () {
    this.courses = {}
    this.sectionController = new sectionController();
    // ReactDOM.render(<Course />, document.getElementById('root'))
}

courseController.prototype = {   
    addACourse: function(name) {
        var newCourse = new course(name);
        this.num++;
        this.courses[name] = newCourse;
    },

    deleteACourse: function(name) {
        var newCourseList = []
        for (var cour in this.courses) {
            if (this.courses[cour].getName() != name) {
                newCourseList[cour] = this.courses[cour];
            }
        }
        this.courses = newCourseList;
    },

    addSection: function(courseName, name, grades, dropped, droppedNum, weight) {
        var sec = new section(name, grades, dropped, droppedNum, weight);
        var cour = this.courses[courseName];
        cour.addSection(sec);
    },

    getCourse: function(newName) {
        for (var course in this.courses) {
            if (this.courses[course].getName() == newName) {
                return this.courses[course];
            }
        }
    },

    getCourses: function() {
        return this.courses;
    },

    rename: function(oldName, newName) {
        for (var cour in this.courses) {
            if (this.courses[cour].getName() == oldName) {
                this.courses[newName] = this.courses[oldName]
                this.courses[newName].setName(newName);
                this.courses[oldName] = "";
            }
        }
    },
    
    getSectionController: function() {
        return this.sectionController;
    }
}

export default courseController;