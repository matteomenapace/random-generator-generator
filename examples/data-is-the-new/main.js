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
// a bot that rants about the weather
var json = 
{ 
	"origin": ["#[#setWord#][word:#word#]tweet#"],
	"tweet": ["\\#Data is the new #emoji#\n\"#quote#\""],
	"setWord":
	[
		"[emoji:🅰,🆎,🔤,🔡][quote:My data starts where your data ends!,Thou whoreson data. Thou unnecessary data!,And when I can't fall asleep I play what I call the data game]",
		"[emoji:📡,📶][quote:Your heart has a powerful little data,Kids have what I call a built-in hypocrisy data]" 
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
    $('#wordCount').html('Characters: ' + generatedText.length)
}

// event handlers
$(window).load(function(){ generate() })
$('#refresh').click(function(){ generate() })