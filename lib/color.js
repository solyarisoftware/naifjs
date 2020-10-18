const COLOR = {
    'RESET': '\x1b[0m',

    // Regular Colors
    'BLACK': '\x1b[0;30m',    // BLACK
    'RED': '\x1b[0;31m',      // RED
    'GREEN': '\x1b[0;32m',    // GREEN
    'YELLOW': '\x1b[0;33m',   // YELLOW
    'BLUE': '\x1b[0;34m',     // BLUE
    'MAGENTA': '\x1b[0;35m',  // MAGENTA
    'CYAN': '\x1b[0;36m',     // CYAN
    'WHITE': '\x1b[0;37m',    // WHITE

    // Bold
    'BLACK_BOLD': '\x1b[1;30m',   // BLACK
    'RED_BOLD': '\x1b[1;31m',     // RED
    'GREEN_BOLD': '\x1b[1;32m',   // GREEN
    'YELLOW_BOLD': '\x1b[1;33m',  // YELLOW
    'BLUE_BOLD': '\x1b[1;34m',    // BLUE
    'MAGENTA_BOLD': '\x1b[1;35m', // MAGENTA
    'CYAN_BOLD': '\x1b[1;36m',    // CYAN
    'WHITE_BOLD': '\x1b[1;37m',   // WHITE

    // Underline
    'BLACK_UNDERLINED': '\x1b[4;30m',     // BLACK
    'RED_UNDERLINED': '\x1b[4;31m',       // RED
    'GREEN_UNDERLINED': '\x1b[4;32m',     // GREEN
    'YELLOW_UNDERLINED': '\x1b[4;33m',    // YELLOW
    'BLUE_UNDERLINED': '\x1b[4;34m',      // BLUE
    'MAGENTA_UNDERLINED': '\x1b[4;35m',   // MAGENTA
    'CYAN_UNDERLINED': '\x1b[4;36m',      // CYAN
    'WHITE_UNDERLINED': '\x1b[4;37m',     // WHITE

    // Background
    'BLACK_BACKGROUND': '\x1b[40m',   // BLACK
    'RED_BACKGROUND': '\x1b[41m',     // RED
    'GREEN_BACKGROUND': '\x1b[42m',   // GREEN
    'YELLOW_BACKGROUND': '\x1b[43m',  // YELLOW
    'BLUE_BACKGROUND': '\x1b[44m',    // BLUE
    'MAGENTA_BACKGROUND': '\x1b[45m', // MAGENTA
    'CYAN_BACKGROUND': '\x1b[46m',    // CYAN
    'WHITE_BACKGROUND': '\x1b[47m',   // WHITE

    // High Intensity
    'BLACK_BRIGHT': '\x1b[0;90m',     // BLACK
    'RED_BRIGHT': '\x1b[0;91m',       // RED
    'GREEN_BRIGHT': '\x1b[0;92m',     // GREEN
    'YELLOW_BRIGHT': '\x1b[0;93m',    // YELLOW
    'BLUE_BRIGHT': '\x1b[0;94m',      // BLUE
    'MAGENTA_BRIGHT': '\x1b[0;95m',   // MAGENTA
    'CYAN_BRIGHT': '\x1b[0;96m',      // CYAN
    'WHITE_BRIGHT': '\x1b[0;97m',     // WHITE

    // Bold High Intensity
    'BLACK_BOLD_BRIGHT': '\x1b[1;90m',    // BLACK
    'RED_BOLD_BRIGHT': '\x1b[1;91m',      // RED
    'GREEN_BOLD_BRIGHT': '\x1b[1;92m',    // GREEN
    'YELLOW_BOLD_BRIGHT': '\x1b[1;93m',   // YELLOW
    'BLUE_BOLD_BRIGHT': '\x1b[1;94m',     // BLUE
    'MAGENTA_BOLD_BRIGHT': '\x1b[1;95m',  // MAGENTA
    'CYAN_BOLD_BRIGHT': '\x1b[1;96m',     // CYAN
    'WHITE_BOLD_BRIGHT': '\x1b[1;97m',    // WHITE

    // High Intensity backgrounds
    'BLACK_BACKGROUND_BRIGHT': '\x1b[0;100m',     // BLACK
    'RED_BACKGROUND_BRIGHT': '\x1b[0;101m',       // RED
    'GREEN_BACKGROUND_BRIGHT': '\x1b[0;102m',     // GREEN
    'YELLOW_BACKGROUND_BRIGHT': '\x1b[0;103m',    // YELLOW
    'BLUE_BACKGROUND_BRIGHT': '\x1b[0;104m',      // BLUE
    'MAGENTA_BACKGROUND_BRIGHT': '\x1b[0;105m',   // MAGENTA
    'CYAN_BACKGROUND_BRIGHT': '\x1b[0;106m',      // CYAN
    'WHITE_BACKGROUND_BRIGHT': '\x1b[0;107m'      // WHITE
}


if (require.main === module) {
  console.log( `${COLOR.YELLOW}this line is in YELLOW${COLOR.RESET}` )
  console.log( `${COLOR.GREEN_BOLD}this line is in GREEN_BOLD${COLOR.RESET}` )
}  


module.exports = COLOR 

