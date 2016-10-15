// create the JSON editor
// using https://github.com/josdejong/jsoneditor
var container = document.getElementById('editor'),
    options = {},
    editor = new JSONEditor(container, options)

// set json
var json = 
{ 
    'origin': 
    [
        'this is a text', 
        'this is #options# text', 
        '#something else#'
    ], 
    'options': 
    [
        'an example', 
        'a different', 
        'another', 
        'a possible', 
        'a generated', 
        'your next'
    ], 
    'something else': 
    [
        'this is something else',  
        'or maybe #options# something',
        'what about #options# question?'
    ] 
}
editor.set(json)

// generate text using Tracery
// using https://github.com/galaxykate/tracery
function generate()
{
    // console.log('generate!')
    var grammar = tracery.createGrammar(editor.get())
    grammar.addModifiers(tracery.baseEngModifiers)
    var generatedText = grammar.flatten('#origin#')
    $('#generated').val(generatedText)
}

// event handlers
$('#refresh').click(function(){ generate() })
$(window).load(function(){ generate() })