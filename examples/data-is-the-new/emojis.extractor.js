// all emojis, sorted by keyword
/*
  var emojisByKeyword = {}
  $.getJSON('emojis.json', function(json) 
  {
    // console.log(json)
    var emojis = json.emojis
    emojis.forEach(function(symbol)
    {
      var keywords = symbol.keywords.split(' | ')
      keywords.forEach(function(keyword)
      {
        if(!emojisByKeyword[keyword]) emojisByKeyword[keyword] = []
        emojisByKeyword[keyword].push(symbol.emoji)  
      })
    })
    console.log(emojisByKeyword)
    download(emojisByKeyword)
  })

  // save the emojis as a JSON file
  function download(object)
  {
    var json = JSON.stringify(object, null, 2)
    var blob = new Blob([json], {type: 'application/json;charset=utf-8'})
    saveAs(blob, 'emojis.json')
  }
*/

// emojis keywords
var keywords = []
$.getJSON('emojisByKeyword.curated.json', function(json) 
{
  // console.log(json)
  for (var keyword in json)
  {
    // console.log(keyword)
    keywords.push(keyword)
  }
  console.log(keywords.join(','))
})  