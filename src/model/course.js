import Course from '../view/Course.js';
import React from 'react';
import ReactDOM from 'react-dom';

var course = function (name, num) {
    this.name = name;
    this.sections = {};
    ReactDOM.render(<Course name={name}/>, document.getElementById('root'));
}

course.prototype = {
    getName: function () {
        return this.name;
    },

    setName: function(newName) {
        this.name = newName;
    },

    getSections: function() {
        return this.sections;
    },

    setSections: function(newSections) {
        this.sections = newSections;
    },

    addSection: function (newSection) {
        this.sections[newSection] = newSection
    },

    deleteSection: function (newSection) {
        var newSec = {}
        for (var sec in this.sections) {
            if (this.sections[sec] != newSection) {
                newSec[sec] = this.sections[sec]
            }
        }
        this.sections = newSec;
    }
}

export default course;