var jsonfile = require('jsonfile'),
    emojisMap = jsonfile.readFileSync('emojis.map.curated.json'),
    quotesMap = jsonfile.readFileSync('quotes.map.json'),
    grammar = 
    {
      "origin": ["#[#setKeyword#]tweet#"],
      "tweet": ["\\#Data is the new #emoji#\n\"#quote#\""],
      "setKeyword":
      [
        // "[keyword:alphabet][emoji:🅰,🆎,🔤,🔡][quote:My data starts where your data ends!,Thou whoreson data. Thou unnecessary data!,And when I can't fall asleep I play what I call the data game]",
      ]
    }      

// console.log(emojisMap['grin'])
// console.log(quotesMap['grin'])

// loop through quotes & emojis
for (var keyword in emojisMap)
{
  // console.log(keyword)
  var gotEmojis = true,
      gotQuotes = true

  // start with the keyword 
  var keywordString = '[keyword:' + keyword +']'
  
  // add emojis
  var emojis = emojisMap[keyword]
  if (emojis && emojis.length > 0)
  {
    var emojiString = '[emoji:' + emojis.join(',') + ']'
    keywordString += emojiString
  }  
  else
  {
    console.log('We have no emojis for ' + keyword + '?!')
    gotEmojis = false
  }

  // add quotes
  var quotes = quotesMap[keyword]
  if (quotes && quotes.length > 0)
  {
    var quoteString = '[quote:' + quotes.join(',') + ']'
    keywordString += quoteString
  }
  else
  {
    console.log('We have no quotes for ' + keyword + '?!')
    gotQuotes = false
  }

  // plonk it into the grammar
  if (gotEmojis && gotQuotes) grammar.setKeyword.push(keywordString)
}


// save to json
jsonfile.writeFileSync('grammar.json', grammar, {spaces: 2})