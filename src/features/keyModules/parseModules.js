import { ansiMap, keycodes } from './keycodeMaps.js';

// function for parsing strings like "\\"
export function parseEscapedChars(str) {
  let parsedStr = "";
  for (let i = 0; i < str.length; i++) {
    // if escaped character is found, skip over the escape character and add the escaped character
    if(str.charAt(i) === '\\' && i !== str.length - 1) {
      i++;
    }
    parsedStr += str.charAt(i);
  }
  return parsedStr;
}

// convert special symbol into a readable string
export function parseSpecialSymbol(char) {
  switch(char) {
    case '~':
      return "TILDE";
    case '`':
      return "BACK_QUOTE"
    case '!':
      return "EXCLAMATION";
    case '@':
      return "AT";
    case '#':
      return "HASH";
    case '$':
      return "DOLLAR";
    case '%':
      return "PERCENT";
    case '^':
      return "CIRCUMFLEX";
    case '&':
      return "AMPERSAND";
    case '*':
      return "ASTERISK";
    case '(':
      return "OPEN_PAREN";
    case ')':
      return "CLOSE_PAREN";
    case '-':
      return "HYPHEN";
    case '_':
      return "UNDERSCORE";
    case '=':
      return "EQUALS"
    case '+':
      return "ADD";
    case '\\':
      return "BACK_SLASH";
    case '{':
      return "OPEN_CURLY_BRACKET";
    case '[':
      return "OPEN_BRACKET";
    case '}':
      return "CLOSE_CURLY_BRACKET";
    case ']':
      return "CLOSE_BRACKET";
    case '|':
      return "PIPE";
    case ':':
      return "COLON";
    case ';':
      return "SEMICOLON";
    case '"':
      return "DOUBLE_QUOTE";
    case '\'':
      return "QUOTE";
    case '<':
      return "LESS_THAN";
    case ',':
      return "COMMA";
    case '>':
      return "GREATER_THAN";
    case '.':
      return "PERIOD";
    case '?':
      return "QUESTION";
    case '/':
      return "SLASH"
    case '↑':
      return "UP";
    case '←':
      return "LEFT";
    case '↓':
      return "DOWN";
    case '→':
      return "RIGHT";
    default:
      return;
  }
}

// usually the bottom legend contains the "non-shift" key
export function parseLegends(toplegend, bottomlegend) {
  // if the legend is not alphanumeric and is 1 character, get the alphanumeric description
  let formatTopLegend = toplegend.replace(/\s/g, '').toUpperCase();
  if (formatTopLegend.length === 1 && !formatTopLegend.match(/^[a-z0-9]+$/i)) {
    formatTopLegend = parseSpecialSymbol(formatTopLegend);
  }
  // do same with bottom legend
  let formatBottomLegend = bottomlegend.replace(/\s/g, '').toUpperCase();
  if (formatBottomLegend.length === 1 && !formatBottomLegend.match(/^[a-z0-9]+$/i)) {
    formatBottomLegend = parseSpecialSymbol(formatBottomLegend);
  }

  let ansiKey = [formatTopLegend, formatBottomLegend];
  if (ansiKey in ansiMap) {
    return ansiMap[ansiKey];
  }
  return;
}

export function keyCodeOf(str) {
  if (str in keycodes) {
    return keycodes[str];
  }
  return -1;
}

export function shadeColor(color, percent) {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
