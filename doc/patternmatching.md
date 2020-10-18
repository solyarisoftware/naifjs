# Pattern Matching

 ⚠️  To be completed. 

## Pattern Matching Agnostic 

In all [examples](../examples/), the input state user sentence is matched with a list of possible regexp patterns. 
The regular expression pattern matching APIs currently supplied are just an helper option. 

NaifJs is agnostic with respect to the user sentence pattern matching mechanism 
and for simplicity and efficiency the parsing has been implemented with the use of regular expressions. 
The regexp match is a possible good solution when numbers of patterns (intents) are a short list and maybe you want to prioritize matching.
See some examples of regexp API usage [here](../lib/patternsMatchRegexp.js#L229-L236).

### Intent-based engines vs regexps

As an alternative to regular expressions, developer could use a third party intent-based classifier. If you want to substitute the proposed regexp APIs, you can integrate by example: 
- [NLP.js](https://github.com/axa-group/nlp.js) intent classifier (made in node js), 
- [RASA NLU](https://github.com/RasaHQ) intent classifier (made in python). 
- any other intent classifier 


### Regexp matching warnings

Here a common way to match a list of regexp patterns:

```javascript
// input state handler 
function getSentence(sentence) {

  switch (take(sentence)) {
    // pattern 1 (higher evaulation priority)
    case match( REGEXP_PATTERN_1 ):
      action1()
      break

    // pattern 2
    case match( REGEXP_PATTERN_2  ):
      action2()
      break

    //  pattern 3 -> action 3 
    //  pattern 4 -> action 4 
    //  ...
    //  pattern N-1 -> action N-1 

    // pattern N
    case match( REGEXP_PATTERN_N  ):
      actionN()
      break

    // fallback 
    default:
      fallback()
      break
  }
}
```

>  - That's great and efficient if you have a short list of patterns, 
>    but please note that all the regexp match sequence is **synchronous**. 
>    That's could be an issue in a multi-user scenario, if number of patterns is NOT short, because the `switch` block the thread. 
>
>  - A part regexps, in general for any alternative/external long-processing pattern matching component, 
>    maybe it's better to "detach" the pattern matching processing using async functions.


---

[top](#) | [home](../README.md) | [index](index.md)
