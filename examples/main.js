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

// get json, setup editor and generate
$.getJSON('grammar.json', function(json) 
{
    editor.set(json)
    generate()
})

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

// event handlers
$('#refresh').click(function(){ generate() })