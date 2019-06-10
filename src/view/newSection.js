import React from 'react';
import '../style/Course.css';
import Section from './Section';

function newSection() {
    return (
        <div className="new-section col-sm-6">
            <div>
                <h1> Add a Section </h1>             
            </div>
            <div className="row row-padding">
                <div className="col-sm-6">
                    <label for="temp">Section Name:</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" id="temp"></input>
                </div>
            </div>
            <div className="row row-padding">
                <div className="col-sm-6">
                    <label for="temp">Grades:</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" id="temp"></input>
                </div>
            </div>
            <div className="row row-padding">
                <div className="col-sm-6">
                    <label for="temp">Are any grades dropped?</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" id="temp"></input>
                </div>
            </div>
            <div className="row row-padding">
                <div className="col-sm-6">
                    <label for="temp">If so, how many are dropped?</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" id="temp"></input>
                </div>
            </div>
            <div className="row row-padding">
                <div className="col-sm-6">
                    <label for="temp">Weight:</label>
                </div>
                <div className="col-sm-6">
                    <input type="number" id="temp" min="0" max="100"></input>
                </div>
            </div>
        </div>
    );
}

export default newSection;