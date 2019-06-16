import Course from "../view/Course";
import course from "../model/course";
import sectionController from "./sectionController.js";
import $ from "jquery";

var courseController = function () {
    this.courses = {}
    this.sectionController = new sectionController();
}

courseController.prototype = {
    addACourse: function(name) {
        var newCourse = new course(name);
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

    getCourse: function(newName) {
        for (var course in this.courses) {
            if (this.courses[course].getName() == newName) {
                return this.courses[course];
            }
        }
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