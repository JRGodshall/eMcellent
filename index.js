"use strict";

var parser = require('./lib/parse.js');
var renderer = require('./lib/render.js');

function parseLine (inputString) {

    var tmpObject = {};

    //Parsing must be performed sequentially.
    tmpObject = parser.extractLabel(inputString, tmpObject);
    tmpObject = parser.extractComment(tmpObject.lineExpression, tmpObject);
    tmpObject = parser.extractIndentation(tmpObject.lineExpression, tmpObject);
    tmpObject = parser.extractRoutines(tmpObject.lineExpression, tmpObject);

    //Line Expression is no longer needed.
    delete tmpObject.lineExpression;
    return tmpObject;
}

function renderLine (inputObject) {

    var renderLine = "";

    //Rendering must be performed sequentially.
    renderLine = renderer.appendLabel(inputObject, renderLine);
    renderLine = renderer.appendIndentation(inputObject, renderLine);
    renderLine = renderer.appendRoutines(inputObject, renderLine);
    renderLine = renderer.appendComment(inputObject, renderLine);

    return renderLine;

}

function parse (inputString) {

    //Strip out carriage returns.
    //TODO:  Investigate escape quote checking, if CR/LF can be contained in text block.
    inputString = inputString.replace("\r", "");
    var inputArray = inputString.split('\n');
    var returnArray = [];

    for (var i = 0; i < inputArray.length; i++) {
        var tmpLineObject = parseLine(inputArray[i]);
        tmpLineObject.lineNumber = i + 1;
        returnArray.push(tmpLineObject);
    }
    return returnArray;
}

function render(inputObject) {

    var response = "";

    for (var i = 0; i < inputObject.length; i++) {
        var tmpLine = renderLine(inputObject[i]);
        if (i === (inputObject.length - 1)) {
            response = response + tmpLine;
        } else {
            response = response + tmpLine + "\r\n";
        }
    }

    return response;

}


module.exports.parse = parse;
module.exports.render = render;
