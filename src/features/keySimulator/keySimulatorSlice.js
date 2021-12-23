import { createSlice } from '@reduxjs/toolkit';
import {
  parseEscapedChars,
  parseSpecialSymbol,
  parseLegends,
  keyCodeOf,
  shadeColor
} from './../keyModules/parseModules.js';

const keySize = 54;
const defaultKeyColor = "#ffffff";
const defaultTextColor = "#000"

export const keySimulatorSlice = createSlice({
  name: 'keySimulator',
  initialState: {
    layout: [],
    keyLocations: {},
    keyboardStyle: {},
    pressedKeys: [],
    highlight: {},
  },
  reducers: {
    // takes an kle layout input and updates the state with layout, keylocations, and style
    // changes the highlight to red if there is incorrect formatting in the kle layout
    parseKLE: (state, action) => {
      if (!action.payload) {
        state.highlight = { borderColor: "#ff0033" };
        return;
      }
      // split the input into rows by newline
      let inputLayout = action.payload.split(/\r\n|\r|\n/);
      if (inputLayout.length === 0) {
        state.highlight = { borderColor: "#ff0033" };
        return;
      }
      // split the rows into an array
      for (let i in inputLayout) {
        // remove empty lines
        if (inputLayout[i] == "") {
          inputLayout.splice(i, 1);
          continue;
        }
        // regex match text within "" and {}
        inputLayout[i] = inputLayout[i].match(/(["'])(?:(?=(\\?))\2.)*?\1|([{])(?:(?=(\\?))\2.)*?([}])/g);
        if (!inputLayout[i]) {
          state.highlight = { borderColor: "#ff0033" };
          return;
        }
      }
      let keycount = 0;
      // format array into key rendering dictionary
      let keyInfo = {
        keyid: keycount,
        class: "",
        legend: "",
        sublegend: "",
        x: 0.0,
        y: 0.0,
        width: 1.0,
        height: 1.0,
        keytopcolor: shadeColor(defaultKeyColor, 10),
        keybordercolor: defaultKeyColor,
        textcolor: defaultTextColor,
        pressed: false,
      }

      // format each switch
      for (let x = 0; x < inputLayout.length; x++) {
        let formatNextKey = false;
        // reset formatting and increment y coordinate
        if (x !== 0) {
          keyInfo = {
            keyid: keycount,
            class: "",
            legend: "",
            sublegend: "",
            x: 0.0,
            y: keyInfo.y + 1,
            width: 1.0,
            height: 1.0,
            keytopcolor: keyInfo.keytopcolor,
            keybordercolor: keyInfo.keybordercolor,
            textcolor: keyInfo.textcolor,
            pressed: false,
          }
        }
        for (let y = 0; y < inputLayout[x].length; y++) {
          // if no special formatting, reset key formatting and increment x coordinate
          if (!formatNextKey && y !== 0) {
            keyInfo = {
              keyid: keycount,
              class: "",
              legend: "",
              sublegend: "",
              x: keyInfo.x + keyInfo.width,
              y: keyInfo.y,
              width: 1.0,
              height: 1.0,
              keytopcolor: keyInfo.keytopcolor,
              keybordercolor: keyInfo.keybordercolor,
              textcolor: keyInfo.textcolor,
              pressed: false,
            }
          }
          // if the current item is formatting, parse the comma separated values
          if (inputLayout[x][y].charAt(0) === "{" &&
            inputLayout[x][y].charAt(inputLayout[x][y].length - 1) === "}") {
            // remove whitespace and trim the brackets
            let keyFormat = inputLayout[x][y].substring(1, inputLayout[x][y].length - 1).replace(/\s/g, '');
            // split multiple formatting information into an array
            let formatInfo = keyFormat.split(",");
            if (Array.isArray(formatInfo)) {
              for (let format in formatInfo) {
                let formatTuple = formatInfo[format].split(":");
                if (formatTuple.length === 2) {
                  switch (formatTuple[0]) {
                    // width of key, only applies to next key
                    case 'w':
                      keyInfo.width = parseFloat(formatTuple[1]);
                      break;
                    // height of key, only applies to next key
                    case 'h':
                      keyInfo.height = parseFloat(formatTuple[1]);
                      break;
                    // x padding, applies to all consequent keys
                    case 'x':
                      keyInfo.x += parseFloat(formatTuple[1]);
                      break;
                    // y padding, applies to all consequent keys
                    case 'y':
                      keyInfo.y += parseFloat(formatTuple[1]);
                      break;
                    // key color, applies to all consequent keys
                    case 'c':
                      // trim quotes
                      if (formatTuple[1].charAt(0) === '"' &&
                        formatTuple[1].charAt(formatTuple[1].length - 1) === '"') {
                        formatTuple[1] = formatTuple[1].substring(1, formatTuple[1].length - 1);
                      }
                      keyInfo.keybordercolor = formatTuple[1];
                      keyInfo.keytopcolor = shadeColor(formatTuple[1], 10);
                      break;
                    // text color, applies to all consequent keys
                    case 't':
                      // trim quotes
                      if (formatTuple[1].charAt(0) === '"' &&
                        formatTuple[1].charAt(formatTuple[1].length - 1) === '"') {
                        formatTuple[1] = formatTuple[1].substring(1, formatTuple[1].length - 1);
                      }
                      keyInfo.textcolor = formatTuple[1];
                      break;
                    // no default - not all formatting cases from KLE are supported yet
                  }
                }
                else {
                  state.highlight = { borderColor: "#ff0033" };
                  return;
                }
              }
            }
            formatNextKey = true;
          }
          // if the current item is a key, parse the legends
          else if (inputLayout[x][y].charAt(0) === '"' &&
            inputLayout[x][y].charAt(inputLayout[x][y].length - 1) === '"') {
            // trim quotes
            let legends = inputLayout[x][y].substring(1, inputLayout[x][y].length - 1)
            // split into by newline
            legends = legends.split("\\n");
            // there is a new line character indicating that there is a sublegend
            // parseEscapedChars: \" -> "
            if (legends.length === 2) {
              keyInfo.sublegend = parseEscapedChars(legends[1]);
            }
            keyInfo.legend = parseEscapedChars(legends[0]);

            formatNextKey = false;
            keycount += 1;
            // change the value of the key string into a key object
            inputLayout[x][y] = keyInfo;
          }
          else {
            state.highlight = { borderColor: "#ff0033" };
            return;
          }
        }
      }
      // remove formatting data from layout array
      for (let x in inputLayout) {
        for (let y in inputLayout[x]) {
          if (typeof (inputLayout[x][y]) === 'string' &&
            inputLayout[x][y].charAt(0) === "{" &&
            inputLayout[x][y].charAt(inputLayout[x][y].length - 1) === "}") {
            inputLayout[x].splice(y, 1);
          }
        }
      }

      let keyboardWidth = 0;
      let keyboardHeight = 0;
      // KLE has been successfully parsed if this line has been reached, update keylocations, keyboard style
      // reset key locations
      state.keyLocations = {};

      for (let x in inputLayout) {
        for (let y in inputLayout[x]) {
          // get dimensions of keyboard
          let keyX = inputLayout[x][y].x + inputLayout[x][y].width;
          if (keyboardWidth < keyX) {
            keyboardWidth = keyX;
          }
          let keyY = inputLayout[x][y].y + inputLayout[x][y].height;
          if (keyboardHeight < keyY) {
            keyboardHeight = keyY;
          }

          // get the common keycode of the pair of legends
          let primaryLegend = parseLegends(inputLayout[x][y].legend, inputLayout[x][y].sublegend);
          // set the class, location, and pressed status
          if (primaryLegend) {
            // class
            inputLayout[x][y].class = primaryLegend;
            // location
            if (!state.keyLocations[primaryLegend]) {
              state.keyLocations[primaryLegend] = [[x, y]];
            }
            else {
              state.keyLocations[primaryLegend].push([x, y]);
            }
            // pressed status
            if (state.pressedKeys.includes(keyCodeOf(primaryLegend))) {
              inputLayout[x][y].pressed = true;
            }
          }
          else {
            inputLayout[x][y].class = "unsupported";
          }
        }
      }


      // mostly arbitrary values for "aesthetic" purposes
      let borderWidth = 0.25;
      let borderHeight = 0.25;
      state.keyboardStyle = {
        ...state.keyboardStyle,
        width: (keyboardWidth + borderWidth * 2) * keySize,
        minWidth: (keyboardWidth + borderWidth * 2) * keySize,
        minHeight: (keyboardHeight + borderHeight * 3.25) * keySize,
        paddingTop: borderHeight * keySize * 1.75,
        paddingBottom: borderHeight * keySize,
        paddingLeft: borderWidth * keySize,
        paddingRight: borderWidth * keySize,
        // marginBottom: keySize * 2,
      }

      // successfully parsed layout, update state with the new layout
      state.layout = inputLayout;
      // state.highlight = {borderColor:""};
    },
    // manage pressed keys here so audio doesn't continuously fire when a key is held down
    keyDown: (state, action) => {
      state.layout[action.payload.x][action.payload.y].pressed = true;
      if (!state.pressedKeys.includes(action.payload.keycode)) {
        state.pressedKeys.push(action.payload.keycode);
      }
    },
    // remove a key from the pressed keys collection
    keyUp: (state, action) => {
      state.layout[action.payload.x][action.payload.y].pressed = false;
      let keyIndex = state.pressedKeys.indexOf(action.payload.keycode);
      if (keyIndex > -1) {
        state.pressedKeys.splice(keyIndex, 1);
      }
    },
    // updates the color of the keyboard
    setKeyboardColor: (state, action) => {
      state.keyboardStyle = {
        ...state.keyboardStyle,
        background: action.payload
      }
    }
  },
});

export const { parseKLE, keyDown, keyUp, setKeyboardColor } = keySimulatorSlice.actions;

// state exports
export const selectLayout = state => state.keySimulator.layout;
export const selectLocations = state => state.keySimulator.keyLocations;
export const selectPressedKeys = state => state.keySimulator.pressedKeys;
export const selectKeyboardStyle = state => state.keySimulator.keyboardStyle;

export default keySimulatorSlice.reducer;
