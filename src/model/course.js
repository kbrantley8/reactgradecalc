var course = function (name) {
    this.name = name;
    this.sections = {};
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