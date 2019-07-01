import React from 'react';
import '../style/Course.css';
import { tsConstructorType } from '@babel/types';

class Section extends React.Component {
    constructor(props) {
        super(props)

        var temp = props.grades;
        var newGrades = []
        var sum = 0;
        for (var i = 0; i < temp.length; i++){
            sum += parseInt(temp[i]);
            newGrades = newGrades + temp[i]
            if (i != temp.length - 1) {
                newGrades = newGrades + ", "
            }
        }
        var avg = Math.round((sum / temp.length) * 10) / 10;

        this.state = {
            name: props.name,
            grades: newGrades,
            dropped: props.dropped,
            numDropped: props.numDropped,
            weight: props.weight,
            avg: avg
        }
    }
    
    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.grades}</td>
                <td>{this.state.dropped}</td>
                <td>{this.state.numDropped}</td>
                <td>{this.state.weight}</td>
                <td>{this.state.avg}</td>
            </tr>
        );
    }
    
}

export default Section;