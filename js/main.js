// create the JSON editor
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

// generate text 
function generate()
{
    // console.log('generate!')
    
    var processedGrammar = tracery.createGrammar(editor.get())
    processedGrammar.addModifiers(tracery.baseEngModifiers)
    var generatedText = processedGrammar.flatten('#origin#')
    $('#generated').val(generatedText)
}

// event handlers
$('#refresh').click(function(){ generate() })

$(window).load(function() 
{
	if (tracery.createGrammar) generate()
})