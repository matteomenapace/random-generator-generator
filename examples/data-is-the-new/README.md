**Data** is being described with [various metaphors](http://dismagazine.com/discussion/73298/sara-m-watson-metaphors-of-big-data) these days.

Let's explore new, non-technocratic metaphors to frame our relationship with data. 

To spark your imagination, new metaphors are deployed to your brain via *emojis* + famous *mis-quotes*.

For example:

> #Data is the new 🎅

> "Data has the right idea - visit people only once a year"

### Where is the data coming from?

Emoji data from [Unicode](http://www.unicode.org/emoji/charts/emoji-list.html)

Quotes data from [BrainyQuote](http://www.brainyquote.com), [GoodReads](https://www.goodreads.com/quotes), [WikiQuotes](https://en.wikiquote.org/wiki/Main_Page), [Sun-Tzu quotes](https://github.com/mattdesl/sun-tzu-quotes/blob/master/quotes.json) and [Corpora](https://github.com/dariusk/corpora/blob/master/data/words/literature/shakespeare_phrases.json)

Mined with [Kimono](https://www.kimonolabs.com/) and Node.js

### TODO

- [ ] Processing quotes

  Create a map object for (mis)quotes to be stored by their `query`  

  For each quote:

  * Split `text` into sentences (`.?!`)
  * If a sentence is longer than 118 characters (that's `#Data is the new 🎅` + `\n` + `""`), filter it out 
  * ~If the `query` (e.g. `Santa`, `face` or `cool`) is used as a *verb* in the sentence, filter it out~
  * Create the mis-quote by replacing `query` with `data` in the sentence
  * Add the mis-quote to the map object, with key set as `query`

- [ ] Generating Tracery grammar, combining emojis and quotes




