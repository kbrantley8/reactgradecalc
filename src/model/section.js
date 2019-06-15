class section {
    constructor(name, grades, dropped, droppedNum, weight) {
        this.name = name;
        this.grades = grades;
        this.dropped = dropped;
        this.droppedNum = droppedNum;
        this.weight = weight;
        this.average = this.calculateAverage();
    }
    
    calculateAverage() {
        var sum = 0;
        for (var g in this.grades){
            sum += g;
        }
        return (sum / this.grades.length);
    }
}

export default section;