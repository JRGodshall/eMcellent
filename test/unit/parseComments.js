"use strict";

var expect = require('chai').expect;
var parser = require('../../lib/parse.js');

describe('Parse Comments >', function () {

    it('Basic Test', function (done) {
        var testLine = ';HELLO WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('');
        done();
    });

    it('End of Line', function (done) {
        var testLine = 'OH HEY ;HELLO WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ');
        done();
    });

    it('Quoted Text', function (done) {
        var testLine = 'OH HEY ";HELLO WORLD"';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ";HELLO WORLD"');
        done();
    });

    it('Semicolon Only', function (done) {
        var testLine = 'OH HEY ;';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ');
        done();
    });

    it('Preceeding Quoted Entries', function (done) {
        var testLine = 'I $P(LIN,";",3,99) ;HELLO WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('I $P(LIN,";",3,99) ');
        done();
    });

    it('Trailing Quoted Entries', function (done) {
        var testLine = 'I $P(LIN,3,99) ;HELLO "WORLD"';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO "WORLD"');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('I $P(LIN,3,99) ');
        done();
    });

    it('Preceeding and Tailing Quoted Entries', function (done) {
        var testLine = 'I $P(LIN,";",3,99) ;HELLO "WORLD"';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO "WORLD"');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('I $P(LIN,";",3,99) ');
        done();
    });

    it('Trailing Only Single Quote Entries in Comment', function (done) {
        var testLine = 'I $P(LIN,";",3,99) ;HELLO "WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO "WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('I $P(LIN,";",3,99) ');
        done();
    });

});
