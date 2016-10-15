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

// generate text
// using https://github.com/galaxykate/tracery
function generate()
{
    // console.log('generate!')
    var grammar = tracery.createGrammar(editor.get())
    grammar.addModifiers(tracery.baseEngModifiers)
    var generatedText = grammar.flatten('#origin#')
    $('#generated').val(generatedText)
}

// save the grammar as a JSON file
function downloadGrammar()
{
    var json = JSON.stringify(editor.get(), null, 2)
    var blob = new Blob([json], {type: 'application/json;charset=utf-8'})
    saveAs(blob, 'grammar.json')
}

// event handlers
$(window).load(function(){ generate() })
$('#refresh').click(function(){ generate() })
$('#download').click(function(){ downloadGrammar() })