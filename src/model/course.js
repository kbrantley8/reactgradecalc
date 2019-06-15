var course = function (name) {
    this.name = name;
    this.sections = [];
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
        this.sections.push(newSection)
    },

    deleteSection: function (newSection) {
        var newSec = []
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i] != newSection) {
                newSec.push(this.sections[i])
            }
        }
        this.sections = newSec;
    }
}

export default course;