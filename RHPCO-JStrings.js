/**
 * RHPCO-JStrings - Extracts all Literal from an input javascript file
 * rakkapriccio@gmail.com
 *
 * Usage:
 * $ node RHPCO-JStrings.js input_file.js
 */
var fs = require('fs');
var async = require('async');
var esprima = require('esprima');
var estraverse = require('estraverse');

function listStrings(code){
    var strings=[];
    var ast = esprima.parse(code);
    estraverse.traverse(ast, {
        enter: function(node){
            if (node.type === 'Literal'  ){
                strings.push(node.value);
            }
        }
    });
    return strings;
}
try{
    if( typeof process.argv[2] != null ){
        fs.readFile(process.argv[2], 'utf8', function (err,data) {
            if (err) {
                return console.log(err.message);

            }
            results = listStrings(data);
            results.forEach(function(s){
                console.log(s);
            })
        });
    }
}catch(err){
    console.log("Sorry :( \n"+err.message);
}
