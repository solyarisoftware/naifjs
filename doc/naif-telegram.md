# `naif telegram` 

 ⚠️  To be completed.


Telegram bot (on-the fly server) dialog tester

```
$ naif telegram
 _   _       _  __     _
| \ | |     (_)/ _|   | |
|  \| | __ _ _| |_    | |___
| . ` |/ _` | |  _|   | / __|
| |\  | (_| | | || |__| \__ \
|_| \_|\__,_|_|_| \____/|___/

NaifJs, simple state-machine based dialog manager
version: 0.46.1, author: giorgio.robino@gmail.com

Telegram bot (on-the fly server) dialog tester:
A single specified dialog run on the instant messaging app.
To test multimedia chat interaction, with multiple users at once.

Usage:

    naif test telegram
    naif telegram

    --token=<your telegram bot token id>

    --dir=<directory path>
      Dialog units directory path

    --start=<unit.state>
      Initial dialog stateid in format "unit.state"

    [--chatids=<chatid1,chatid2,...>]
       list of telegram chat ids (comma separated, no blanks)

    [--logfile=<path/filename>]
       Log filename with directory path

    [--sessionsfile=<path/filename>]
       Sessions filename with directory path

Examples:

   naif telegram --token=YOUR_TELEGRAM_BOT_TOKEN \
                 --dir=examples/yourApp \
                 --start=yourDialogUnit.startState \
                 --chatids=123456789,923465768,228765452 \
                 --logfile=/dev/stdout \
                 --sessionsfile=yourApp/sessions.json
```

| ![naif telegram usage](img/naiftelegram.png) |
|:--:|
| figure 2: using `naif telegram`. On backgrond the terminal. On the right the telegram bot running a dialog |

---

[top](#) | [home](../README.md) | [index](index.md)
