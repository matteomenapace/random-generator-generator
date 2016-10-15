// create the JSON editor
// using https://github.com/josdejong/jsoneditor
var container = document.getElementById('editor'),
    options = {
        // modes: ['code','tree'],
        onEditable: function (node) {
            switch (node.field) {
                case 'origin':
                    return {
                        field: false,
                        value: true
                    }
                default:
                    return true    
            }
        },
        onChange: function(){ generate() }
    },
    editor = new JSONEditor(container, options)

// set json
var json = 
{ 
    'origin': 
    [
        '#something.a# for #someone# to #do# #something else# #somehow#'
    ], 
    'something': 
    [
        'school', 
        'game', 
        'evening', 
        'place'
    ], 
    'someone': 
    [
        'children', 
        'adults', 
        'you'
    ],
    'do': 
    [
        'make', 
        'break', 
        'learn about'
    ],
    'something else': 
    [
        'friends', 
        'food', 
        'robots'
    ],
    'somehow': 
    [
        'together',  
        'quickly',
        'at home'
    ] 
}
editor.set(json)
//editor.expandAll()

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