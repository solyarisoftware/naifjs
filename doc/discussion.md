# Discussion

## Pros and cons

Pros:

- NaifJs is a low-level framework, dedicated to nodejs/javascript developers
  (this is also in the cons section). 

- The `naif` command line program supply a micro-framework of utilities 
- enabling to develop quickly a dialog project.

- Designer/coder must think, design and implement dialogues as "state machines",
  explicitly thinking about internal states of a conversation 
  (this is also in the cons section). 

- Very fast run-time (especially using NaifJs as embedded library)

- Dialog manager is agnostic with respect to inbound/outbound message types.
  Even if in practice any inbound message (coming from an end-user) is turned to a text, 
  NaifJs can elaborate in theory any kind of inbound message data type 
  and the elaboration and the state transition logic, are all in charge to developer. 

  By example a state could take in input a speech (a voice audio file) 
  doing some sort of in-state elaboration without any transcript (ASR) pattern matching,
  but maybe the audio file could be processed just as a audio object processing. 

- Well matches with stateful-based, rule-based applications as task-based workflows.
  E.g. Games, interactive stories, real-time/embedded (voice) assistants/cobots.

- Good for slot-filling / complex slot validation, closed-domain / task completion dialogues.

- No dependencies from external (cloud-based) "NLU" platforms (if default, but optional regexp pattern matching is acceptable).

- NaifJs command line utilities help to quickly test dialogues from command line and from a Telegram bot.

- No machine-learning magics.
  (this is also in the cons section). 


Cons:

- NaifJs is a low-level framework, dedicated to nodejs/javascript developers
  (this is also in the pros section). 

- Designer/coder must think, design and implement dialogues as "state machines",
  explicitly thinking about internal states of a conversation
  (this is also in the pros section). 

- Not a valid approach for FAQ-like question-answering or open-domain/chit-chat chatbots. 

- No machine-learning magics.
  (this is also in the pros section). 


## Food for thought

- Among researcher in "Conversational AI", State-machines are currently (in 2020), evil! 
  The old way of thinking. And I probably agree!
  The machine-learning based "language models" along with probabilistic approach that build "virtual"/internal states, 
  seem now a very promising way to overcome the deterministic/hard-coded approach that is the basis of NaifJs. 
  Good stuff has done by RASA opensource (RASA Core) 
  and Alexa Conversations is a promising way to rethink how overcome explicit states development. 

- What seems to me a still valid in NaifJs is the implementation of a multi-turn dialog 
  as a graph of function handlers that represents states of a state machine. 
  I imagine NaifJs dialog units as an "assembler" language, 
  acting as the *transpilation* of a possible high-level common programming language 
  (that allows conversational designers to quick realize dialog systems). 



## BackStory

Few years ago, I started working in the idea to implement a human-machine multi-turn conversation using the conceptual model of a state machine.
At time, I was focused on how to implement a conversational agent (chatbot) for accomplish workflows/task in e-commerce/e-shopping domain. 
In general I was focused to realize a simple tool for developers allowing conversational, closed-domain, task-oriented workflows.

In 2016 I realized first prototype in Ruby language 
(slides of my talk: [Naif — Ruby micro framework to build dumb chat machines](https://convcomp.it/naif-ruby-micro-framework-to-build-dumb-chat-machines-5c552a8c8f7e#.exp91nt72)). The reason of name *Naif* was because I was aware that the state machine approach do not pretend to be a magic "conversational AI" solution.

As researcher at the Italian National Research Council Institute for Educational Technology (ITD-CNR), 
in 2019 I ported the original prototype from Ruby to NodeJs, building NaifJs as it is now. 
I used NaifJs as multi-user dialog manager engine of [CPIAbot](https://www.itd.cnr.it/Progetti_Rispo1.php?PROGETTO=1193), 
a Telegram voice/multi-modal chatbot to help foreigners refugees, students of Italian public adult schools, in learning Italian language L2.

Related academic papers (introducing NaifJs usage):

- F. Ravicchio, G. Robino, S. Torsani.
  *Un assistente conversazionale a supporto dell’apprendimento dell’italiano L2 per migranti: CPIAbot*. Sep 2020. 
  Published in Italian Journal of Educational Technology (IJET). [PDF](https://ijet.itd.cnr.it/article/view/1142/1081) https://doi.org/10.17471/2499-4324/1142

- F. Ravicchio, G. Robino, G. Trentin.
  *CPIAbot: un chatbot nell’insegnamento dell’Italiano L2 per stranieri*. 
  Published in Didamatica 2019 acts, Best Paper Award in section: BYOD. Mobile e Mixed Learning (ISBN 978-88-98091-50-8) [PDF](https://www.aicanet.it/didamatica2019/atti-2019) p. 77-86.

In September 2020 I decided to opensource my software with a MIT license, allowing people to use the framework and hopefully contribute to improve it.   


## Acknowledgments

- In 2016 I supported [ChatScript](https://github.com/ChatScript/ChatScript), 
  Bruce Wilcox’s famous language/engine to build chatbots, contributing myself to the open-source project, 
  rewriting [ChatScript wiki documentation](https://github.com/ChatScript/ChatScript/tree/master/WIKI) on the Github repo.
  ChatScript has been for me an huge source of inspiration.

- Telegram is a beautiful platform to experiments multimodal bots, 
  due to the excellent [Telegram Bot API](https://core.telegram.org/bots/api). 
  I used Telegram also to develop CPIAbot before mentioned, 
  and NaifJs supply an adapter to the platform and the rapid test tool: `naif telegram`. 
  A special thanks goes to the author of nodejs library 
  [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) I used also in this project.


---

[top](#) | [home](../README.md) | [index](index.md)
