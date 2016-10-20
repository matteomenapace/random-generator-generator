var testMode = false,
    jsonfile = require('jsonfile'),
    fileName = testMode ? 'quotes.test.json' : 'quotes.raw.json',
    json = jsonfile.readFileSync(fileName),
    quotes = json.results.quotes,
    quotesMap = {},
    query = '',
    maxLength = 118

// console.log(quotes)

// loop through all quotes
quotes.forEach(function(quote)
{
  // replace \n in keywords
  if (quote.keywords)
  {
    var keywords = quote.keywords
    keywords = keywords.replace(/(?:\r\n|\r|\n)/g,'')
    quote.keywords = keywords.toLowerCase()
  }

  // assign query in case the quote is missing it
  if (quote.query) query = quote.query.toLowerCase()
  quote.query = query
  
  // sanitise the quote text
  var text = quote.text
  text = text.replace(/(U\.S\.)/gmi, 'US') // U.S. > US

  // split the text into sentences
  // http://stackoverflow.com/a/18914855/2928562
  var sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|')
  // console.log(sentences)

  sentences.forEach(function(sentence)
  {
    // don't bother if the sentece doesn't contain the query
    if (sentence.toLowerCase().indexOf(query) < 0) return

    // create misQuote by replacing query with 'data'
    var regex = new RegExp('\\b(' + query + ')', 'gmi')
    var misQuote = sentence.replace(regex, 'data')

    // check for plural -> 'datas'
    misQuote = misQuote.replace(/\b(datas)\b/gmi, 'data')

    // check for 'an data'
    misQuote = misQuote.replace(/\b(an data)\b/gmi, 'data')

    // check for 'a data'
    misQuote = misQuote.replace(/\b(a data)\b/gmi, 'data')

    // commas ',' are special characters in Tracery grammars, dang!
    // using workaround https://github.com/galaxykate/tracery/issues/20 
    regex = new RegExp('(,)', 'gi')
    misQuote = misQuote.replace(regex, '‚')

    // colons are also special characters in Tracery grammars: dang!
    regex = new RegExp('(: )', 'gi')
    misQuote = misQuote.replace(regex, '：')
    // trying FULLWIDTH COLON Unicode: U+FF1A, UTF-8: EF BC 9A

    // trim + SentenceCase
    misQuote = misQuote.trim()
    misQuote = misQuote.charAt(0).toUpperCase() + misQuote.substring(1)

    // don't bother if mis-quote is longer than 118 characters (that's `#Data is the new 🎅` + `\n` + `""`)
    if (misQuote.length > maxLength) return

    // console.log(misQuote.length + ' ' + quote.query + ' > ' + misQuote)

    addToQuotesMap(query, misQuote)
  })
})

function addToQuotesMap(key, value)
{
  if (!quotesMap[key]) quotesMap[key] = []
  quotesMap[key].push(value)  
}

console.log(quotesMap)

// save to json
jsonfile.writeFileSync('quotes.map.json', quotesMap, {spaces: 2})