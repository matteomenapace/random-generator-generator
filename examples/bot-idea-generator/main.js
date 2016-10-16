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
    'origin': 
    [
        'A bot #doing# #something#, #somehow#'
    ], 
    'doing': 
    [
        'complaining about', 
        'ranting about', 
        'rhyming over',
        'telling stories about',
        'stating factoids about',
        'drawing conclusions on',
        'misspelling',
        'inventing words about',
        'simulating',
        'asking questions about',
        'pretending to know about',
        'drawing landscapes inspired by',
        'reciting poems about',
        'regurgitating quotes about',
        'predicting the future of',
        'telling tales of',
        'speculating about',
        'musing over',
        'spreading lies about',
        'composing haikus about',
        'tweeting about anything but',
        'linking to Wiki-pages about',
        'giving instructions about',
        'making fun of',
        'shouting about',
        'describing',
        'confusing',
        'disregarding',
        'ignoring',
        'lecturing on',
        'bickering over',
        'blaming',
        'calling out',
        'challenging',
        'contemplating',
        'criticising',
        'flirting with',
        'listing'
    ],
    'something': 
    [
        'politics', 
        'the weather', 
        'art', 
        'the Web', 
        'cats', 
        'climate change',
        'history',
        'the economy',
        'Brexit',
        'geography',
        'banks',
        'sports',
        'science-fiction',
        'nature',
        'animals',
        'big data',
        'technology',
        'robocars',
        'people',
        'the good old days',
        'money',
        'time',
        'jobs',
        'taxes',
        'immigrants',
        'locals',
        'tourists',
        'genders',
        'genres'
    ], 
    'somehow': 
    [
        'calmly',  
        'formally',
        'with animated gifs',
        'pedantically',
        'continuously',
        'with gusto',
        'with emojis',
        'shamefully',
        'programmatically',
        'informally',
        'with dingbats',
        'critically',
        'inappropriately',
        'actively',
        'passive-agressively',
        'precisely',
        'patiently',
        'impulsively',
        'decisevely',
        'naively',
        'logically',
        'irrationally',
        'erratically',
        'with humour',
        'with noise',
        'privately',
        'quietly',
        'practically',
        'sarcastically',
        'ironically',
        'romantically'
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

// event handlers
$(window).load(function(){ generate() })
$('#refresh').click(function(){ generate() })