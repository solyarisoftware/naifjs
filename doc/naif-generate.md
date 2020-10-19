# `naif generate` 

Create dialog unit skeleton source code

```
$ naif generate
 _   _       _  __     _
| \ | |     (_)/ _|   | |
|  \| | __ _ _| |_    | |___
| . ` |/ _` | |  _|   | / __|
| |\  | (_| | | || |__| \__ \
|_| \_|\__,_|_|_| \____/|___/

NaifJs, simple state-machine based dialog manager
version: 0.46.1, author: giorgio.robino@gmail.com

Create dialog unit skeleton source code

Usage:

    naif new dialog
    naif new unit

    --dir=<directory path>
      Dialog units directory path

    --unit=<unit name>
      Name of the dialog unit

    [--desc=<description>]
       Unit name description (for dialog user)

    [--outstates=<stateName1,stateName2,...>]
       List of output state names, comma separated

    --instates=<stateName1:numPatterns1,stateName2:numPattern2,...>
      List of input state names, comma separated
      Each input state name is colon separated by a number of patterns

     [-e]
       end case in pattern

     [-h]
       help case in pattern

Examples:

   naif new --unit=myUnit --dir=tmp/dialogs/aDialog --instates=oneState:4

   naif new --unit=indovinalaparola \
            --dir=./examples/indovinalaparola \
            --desc="Indovina La Parola" \
            --outstates=start \
            --instates=input1:2,input2:3
```

---

[top](#) | [home](../README.md) | [index](index.md)
