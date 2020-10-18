# Requests and responses message types

NaifJs is a backend dialog manager engine, multi-user, channel agnostic, message agnostic.


## Channel agnostic

Each inbound and outbound messages are to/from a specific *sessionid* (the user id).

NaifJs is independent from the frontend messaging channel
(that could be an instant messaging app like Telegram,
Slack, etc., or a command line interface, anything).


## Message type agnostic

NaifJs interact with ithe external system (the user at the end of the day), receiving and sending messages. 
The platform is agnostic regarding media contents in `request` and `response` messages. 

### [`Request` (inbound) messages](request.md) 
 
The A messaging channel adapter module (external to NaifJs) 
is in charge to transfer inbound messages supplying and request data object to the `request` API. 
Read more [here](request.md).

### [`Response` (outbound) messages](response.md) 

The channel adapter is also in charge to translate the outbound `response` data object in a message type 
appropriate to the channel surface. 
E.g. the response could be a text or a speech or an image to be displayed on the channel 
(by example a mobile instant messaging chat app).
NaifJs is able to manage the user silence (no answer) after a prompt. 
This is done associating a timeout handler to a `response` function. 
For details see [Response Timeout Handlers](response.md#response-timeout-handlers).
Read more [here](response.md).

---

[top](#) | [home](../README.md) | [index](index.md)
