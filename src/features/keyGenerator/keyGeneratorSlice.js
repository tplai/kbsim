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
    keyboardWidth: 0.0,
    keyboardHeight: 0.0,
    borderWidth: 0.25,
    borderHeight: 0.25,
    highlight: {},
  },
  reducers: {
    parseKLE: (state, action) => {
      state.input = action.payload;
      if (!state.input) {
        state.highlight = {borderColor:"#ff0033"};
        return;
      }
      // split the input into rows by newline
      state.array = state.input.split(/\r\n|\r|\n/);
      if (state.array.length == 0) {
        state.highlight = {borderColor:"#ff0033"};
        return;
      }
      // split the rows into an array
      for (let i in state.array) {
        // regex match text within "" and {}
        state.array[i] = state.array[i].match(/(["'])(?:(?=(\\?))\2.)*?\1|([{])(?:(?=(\\?))\2.)*?([}])/g);
        if (!state.array[i]) {
          state.highlight = {borderColor:"#ff0033"};
          return;
        }
      }
      // format array into key rendering dictionary
      let keyInfo = {
        legend: "",
        sublegend: "",
        x: 0.0,
        y: 0.0,
        width: 1.0,
        height: 1.0,
        keycolor: "#000",
        textcolor: "#fff",
      }
      for (let x = 0; x < state.array.length; x++) {
        let formatNextKey = false;
        // reset formatting and increment y coordinate
        if (x != 0) {
          keyInfo = {
            legend: "",
            sublegend: "",
            x: 0.0,
            y: keyInfo.y + 1,
            width: 1.0,
            height: 1.0,
            keycolor: keyInfo.keycolor,
            textcolor: keyInfo.textcolor,
          }
          // console.log(keyInfo.keycolor);
        }
        for (let y = 0; y < state.array[x].length; y++) {
          // if no special formatting, reset key formatting and increment x coordinate
          if (!formatNextKey && y != 0) {
            // console.log(keyInfo.keycolor);
            keyInfo = {
              legend: "",
              sublegend: "",
              x: keyInfo.x + keyInfo.width,
              y: keyInfo.y,
              width: 1.0,
              height: 1.0,
              keycolor: keyInfo.keycolor,
              textcolor: keyInfo.textcolor,
            }
            // console.log("after"+keyInfo.keycolor);
          }
          if (state.array[x][y].charAt(0) == "{" && state.array[x][y].charAt(state.array[x][y].length - 1) == "}") {
            // remove whitespace and trim the brackets
            let keyFormat = state.array[x][y].substring(1, state.array[x][y].length - 1).replace(/\s/g, '');
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
                  case 'c':
                    // trim quotes
                    if (formatTuple[1].charAt(0) == '"' && formatTuple[1].charAt(formatTuple[1].length - 1) == '"') {
                      formatTuple[1] = formatTuple[1].substring(1, formatTuple[1].length - 1);
                    }
                    keyInfo.keycolor = formatTuple[1];
                    break;
                  case 't':
                    // trim quotes
                    if (formatTuple[1].charAt(0) == '"' && formatTuple[1].charAt(formatTuple[1].length - 1) == '"') {
                      formatTuple[1] = formatTuple[1].substring(1, formatTuple[1].length - 1);
                    }
                    keyInfo.textcolor = formatTuple[1];
                    break;
                }
              }
              else {
                state.highlight = {borderColor:"#ff0033"};
                return;
              }
            }
            formatNextKey = true;
          }
          else if (state.array[x][y].charAt(0) == '"' && state.array[x][y].charAt(state.array[x][y].length - 1) == '"') {
            // trim quotes
            let legends = state.array[x][y].substring(1, state.array[x][y].length - 1)
            // split into by newline
            legends = legends.split("\\n");
            // there is a new line character indicating that there is a sublegend
            if (legends.length == 2) {
              keyInfo.sublegend = parseEscapedChars(legends[1]);
            }
            keyInfo.legend = parseEscapedChars(legends[0]);

            formatNextKey = false;
            console.log(keyInfo.keycolor);
            state.array[x][y] = keyInfo;
          }
          else {
            state.highlight = {borderColor:"#ff0033"};
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

      // get the dimensions of the keyboard
      for (let x in state.array) {
        for (let y in state.array[x]) {
          let keyX = state.array[x][y].x + state.array[x][y].width;
          if (state.keyboardWidth < keyX) {
            state.keyboardWidth = keyX;
          }
          let keyY = state.array[x][y].y + state.array[x][y].height;
          if (state.keyboardHeight < keyY) {
            state.keyboardHeight = keyY;
          }
        }
      }
      // console.log("W:"+state.keyboardWidth+" H:"+state.keyboardHeight);
      state.highlight = {borderColor:"#ff0033"};
    },
    highlightColor: (state, action) => {
      state.highlight = action.payload;
    },
  },
});

function parseEscapedChars(str) {
  let parsedStr = "";
  for (let i = 0; i < str.length; i++) {
    // if escaped character is found, skip over the escape character and add the escaped character
    if(str.charAt(i) == '\\' && i != str.length - 1) {
      i++;
    }
    parsedStr += str.charAt(i);
  }
  return parsedStr;
}

export const { parseKLE, clearField, incrementByAmount, highlightColor } = keyGeneratorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.keyGenerator.value)`
// export const selectCount = state => state.keyGenerator.input;
export const selectLayout = state => state.keyGenerator.array;
export const selectKeyboardWidth = state => state.keyGenerator.keyboardWidth;
export const selectKeyboardHeight = state => state.keyGenerator.keyboardHeight;
export const selectBorderWidth = state => state.keyGenerator.borderWidth;
export const selectBorderHeight = state => state.keyGenerator.borderHeight;
export const selectHighlight = state => state.keyGenerator.highlight;

export default keyGeneratorSlice.reducer;

/*

["Esc",{x:0.5},"F1","F2","F3","F4",{x:0.5},"F5","F6","F7","F8",{x:0.5},"F9","F10","F11","F12",{x:0.5},"Delete"],
[{y:0.25},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{w:2},"Backspace","End"],
[{w:1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{w:1.5},"|\n\\","PgUp"],
[{w:1.25,w2:1.75,l:true},"Caps Lock",{x:0.5},"A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{w:2.25},"Enter","PgDn"],
[{w:2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{w:1.75},"Shift","↑","Fn"],
[{w:1.5},"Ctrl",{x:0.75,w:1.5},"Alt",{a:7,w:7},"",{a:4,w:1.5},"Win",{x:0.75},"←","↓","→"]

[{c:"#f1beb0",t:"#2b2b2b"},"Esc",{x:0.5,c:"#e1dbd1"},"F1","F2","F3","F4",{x:0.5,c:"#2b2b2b",t:"#f1beb0"},"F5","F6","F7","F8",{x:0.5,c:"#e1dbd1",t:"#2b2b2b"},"F9","F10","F11","F12",{x:0.5,c:"#2b2b2b",t:"#f1beb0"},"Delete"],
[{y:0.25},"~\n`",{c:"#e1dbd1",t:"#2b2b2b"},"!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{c:"#2b2b2b",t:"#f1beb0",w:2},"Backspace","Home"],
[{w:1.5},"Tab",{c:"#e1dbd1",t:"#2b2b2b"},"Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{c:"#2b2b2b",t:"#f1beb0",w:1.5},"|\n\\","PgUp"],
[{w:1.25,w2:1.75,l:true},"Caps Lock",{x:0.5,c:"#e1dbd1",t:"#2b2b2b"},"A","S","D",{n:true},"F","G","H",{n:true},"J","K","L",":\n;","\"\n'",{c:"#2b2b2b",t:"#f1beb0",w:2.25},"Enter","PgDn"],
[{w:2.25},"Shift",{c:"#e1dbd1",t:"#2b2b2b"},"Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{c:"#2b2b2b",t:"#f1beb0",w:1.75},"Shift",{c:"#f1beb0",t:"#2b2b2b"},"↑",{c:"#2b2b2b",t:"#f1beb0"},"End"],
[{w:1.5},"Ctrl",{x:0.75,w:1.55},"Alt",{x:-0.05,c:"#f1beb0",t:"#000000",a:7,w:7},"",{c:"#2b2b2b",t:"#f1beb0",a:4,w:1.5},"Alt",{x:0.75,c:"#f1beb0",t:"#2b2b2b"},"←","↓","→"]

["Esc",{x:1},"F1","F2","F3","F4",{x:0.5},"F5","F6","F7","F8",{x:0.5},"F9","F10","F11","F12",{x:0.25},"PrtSc","Scroll Lock","Pause\nBreak"],
[{y:0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{w:2},"Backspace",{x:0.25},"Insert","Home","PgUp",{x:0.25},"Num Lock","/","*","-"],
[{w:1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{w:1.5},"|\n\\",{x:0.25},"Delete","End","PgDn",{x:0.25},"7\nHome","8\n↑","9\nPgUp",{h:2},"+"],
[{w:1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{w:2.25},"Enter",{x:3.5},"4\n←","5","6\n→"],
[{w:2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{w:2.75},"Shift",{x:1.25},"↑",{x:1.25},"1\nEnd","2\n↓","3\nPgDn",{h:2},"Enter"],
[{w:1.25},"Ctrl",{w:1.25},"Win",{w:1.25},"Alt",{a:7,w:6.25},"",{a:4,w:1.25},"Alt",{w:1.25},"Win",{w:1.25},"Menu",{w:1.25},"Ctrl",{x:0.25},"←","↓","→",{x:0.25,w:2},"0\nIns",".\nDel"]


*/
