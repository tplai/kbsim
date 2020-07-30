import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const keyGeneratorSlice = createSlice({
  name: 'keyGenerator',
  initialState: {
    input: 0,
    layout: "Input KLE Raw Data",
    array: [],
    highlight: "none",
  },
  reducers: {
    parseKLE: (state, action) => {
      state.input = action.payload;
      if (!state.input) {
        state.highlight = "red";
        return;
      }
      // split the input into rows by newline
      state.array = state.input.split(/\r\n|\r|\n/);
      if (state.array.length == 0) {
        state.highlight = "red";
        return;
      }
      // split the rows into an array
      for (let i in state.array) {
        // regex match text within "" and {}
        state.array[i] = state.array[i].match(/(["'])(?:(?=(\\?))\2.)*?\1|([{])(?:(?=(\\?))\2.)*?([}])/g);
        if (!state.array[i]) {
          state.highlight = "red";
          return;
        }
      }
      // format array into key rendering state
      // let rowHeight = 0
      let keyInfo = {
        legend: "",
        sublegend: "",
        x: 0.0,
        y: 0.0,
        width: 1.0,
        height: 1.0,
      }
      for (let x = 0; x < state.array.length; x++) {
        // reset formatting and increment y coordinate
        if (x != 0) {
          keyInfo = {
            legend: "",
            sublegend: "",
            x: 0.0,
            y: keyInfo.y + 1,
            width: 1.0,
            height: 1.0,
          }
        }
        let formatNextKey = false;
        for (let y = 0; y < state.array[x].length; y++) {
          // if no special formatting, reset key formatting and increment x coordinate
          if (!formatNextKey && y != 0) {
            keyInfo = {
              legend: "",
              sublegend: "",
              x: keyInfo.x + keyInfo.width,
              y: keyInfo.y,
              width: 1.0,
              height: 1.0,
            }
          }
          if (state.array[x][y].charAt(0) == "{" && state.array[x][y].charAt(state.array[x][y].length - 1) == "}") {
            // remove whitespace and trim the brackets
            let keyFormat = state.array[x][y].substring(1, state.array[x][y].length - 1).replace(/\s/g, '');
            // console.log(state.array[x][y]);
            // split multiple formatting information into an array
            let formatInfo = keyFormat.split(",");
            for (let format in formatInfo) {
              let formatTuple = formatInfo[format].split(":");
              if (formatTuple.length == 2) {
                switch (formatTuple[0]) {
                  case 'w':
                    keyInfo.width = parseFloat(formatTuple[1]);
                    break;
                  case 'h':
                    keyInfo.height = parseFloat(formatTuple[1]);
                    break;
                  case 'x':
                    keyInfo.x += parseFloat(formatTuple[1]);
                    break;
                  case 'y':
                    keyInfo.y += parseFloat(formatTuple[1]);
                    break;
                }
              }
              else {
                state.highlight = "red";
                return;
              }
            }
            formatNextKey = true;
          }
          else if (state.array[x][y].charAt(0) == '"' && state.array[x][y].charAt(state.array[x][y].length - 1) == '"') {
            let legends = state.array[x][y].split("\n");
            // there is a new line character indicating that there is a sublegend
            if (legends.length == 2) {
              keyInfo.sublegend = legends[1];
            }
            keyInfo.legend = legends[0];
            formatNextKey = false;
            state.array[x][y] = keyInfo;
          }
          else {
            state.highlight = "red";
            return;
          }
        }
      }

      // remove formatting data from layout array
      for (let x in state.array) {
        for (let y in state.array[x]) {
          if (typeof(state.array[x][y]) === 'string' && state.array[x][y].charAt(0) == "{" && state.array[x][y].charAt(state.array[x][y].length - 1) == "}") {
            state.array[x].splice(y, 1);
          }
        }
      }

      state.highlight = "green";
    },
    createKeys: () => {
      console.log("made it");
    },
    setHighlight: state => {

    },
    clearField: state => {
      state.input = "";
    },
    highlightColor: (state, action) => {
      state.highlight = action.payload;
    },
  },
});

export const { parseKLE, clearField, incrementByAmount, highlightColor } = keyGeneratorSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// export const createKeys = payload => dispatch => {
//   dispatch(parseKLE(payload.payload));
// };

// export function renderKeys() {
//
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.keyGenerator.value)`
// export const selectCount = state => state.keyGenerator.input;
export const selectLayout = state => state.keyGenerator.array;
export const selectHighlight = state => state.keyGenerator.highlight;

export default keyGeneratorSlice.reducer;

/*
["Esc",{x:1},"F1","F2","F3","F4",{x:0.5},"F5","F6","F7","F8",{x:0.5},"F9","F10","F11","F12",{x:0.25},"PrtSc","Scroll Lock","Pause\nBreak"],
[{y:0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{w:2},"Backspace",{x:0.25},"Insert","Home","PgUp",{x:0.25},"Num Lock","/","*","-"],
[{w:1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{w:1.5},"|\n\\",{x:0.25},"Delete","End","PgDn",{x:0.25},"7\nHome","8\n↑","9\nPgUp",{h:2},"+"],
[{w:1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{w:2.25},"Enter",{x:3.5},"4\n←","5","6\n→"],
[{w:2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{w:2.75},"Shift",{x:1.25},"↑",{x:1.25},"1\nEnd","2\n↓","3\nPgDn",{h:2},"Enter"],
[{w:1.25},"Ctrl",{w:1.25},"Win",{w:1.25},"Alt",{a:7,w:6.25},"",{a:4,w:1.25},"Alt",{w:1.25},"Win",{w:1.25},"Menu",{w:1.25},"Ctrl",{x:0.25},"←","↓","→",{x:0.25,w:2},"0\nIns",".\nDel"]
*/