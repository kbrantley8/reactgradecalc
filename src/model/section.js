var section = function (name, grades, dropped, droppedNum, weight) {
    this.name = name;
    this.grades = grades;
    this.dropped = dropped;
    this.droppedNum = droppedNum;
    this.weight = weight;
    this.average = this.calculateAverage(this.grades);
}

section.prototype = {

    getName: function() {
        return this.name;
    },

    setName: function(newName) {
        this.name = newName;
    },

    getGrades: function() {
        return this.grades;
    },

    setGrades: function(newGrades) {
        this.grades = newGrades;
    },

    getDropped: function() {
        return this.dropped;
    },

    setDropped: function(newDropped) {
        this.dropped = newDropped;
    },

    getDroppedNum: function() {
        return this.droppedNum;
    },

    setDroppedNum: function(newDroppedNum) {
        this.droppedNum = newDroppedNum;
    },

    getWeight: function() {
        return this.weight;
    },

    setWeight: function(newWeight) {
        this.weight = newWeight;
    },

    calculateAverage: function(grades) {
        var sum = 0;
        for (var i = 0; i < grades.length; i++){
            sum += grades[i];
        }
        return (sum / grades.length);
    }
}

export default section;