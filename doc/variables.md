# Dialog unit variables

Each dialog unit has a *short-term memory* made by session-persistent variables 
with local scope to the unit itself, but shared among all dialog units part of the same application.

In NaifJs each node is implemented as a *stateless* javascript function handler.
Variables are managed with specific NaifJs API primitives (`getvar`, `setvar`, etc.) 
and they are stored in the [session data storage](sessions.md).

> Dialog unit variables must not be confused with *slots* or *entities* variables concerning input states pattern matching. 
> For details see [pattern matching](patternmatching.md) doc.


---

[top](#) | [home](../README.md) | [index](index.md)
