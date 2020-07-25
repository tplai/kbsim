import { createSlice } from '@reduxjs/toolkit';

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    input: 0,
    layout: "Input KLE Raw Data",
    array: [],
    rows: 0,
    columns: 0,
    highlight: "none",
  },
  reducers: {
    parseKLE: (state, action) => {
      state.input = action.payload;
      if (!state.input) {
        state.highlight = "red";
      }
      else {
        // split the input into rows by newline
        state.array = state.input.split(/\r\n|\r|\n/);
        // split the rows into an array by values in "" and {}
        for (let i in state.array) {
          // console.log(state.array[i]);
          state.array[i] = state.array[i].match(/"(.*?[^\\])"|{(.*?[^\\])}/g);
          for (let j in state.array[i]) {
            console.log(state.array[i][j]);
          }
        }
      }
    },
    clearField: state => {
      state.input = "";
    },
    highlightColor: (state, action) => {
      state.highlight = action.payload;
    },
  },
});

export const { parseKLE, clearField, incrementByAmount, highlightColor } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.input;
export const selectLayout = state => state.counter.layout;
export const selectHighlight = state => state.counter.highlight;

export default counterSlice.reducer;

/*
["Esc",{x:1},"F1","F2","F3","F4",{x:0.5},"F5","F6","F7","F8",{x:0.5},"F9","F10","F11","F12",{x:0.25},"PrtSc","Scroll Lock","Pause\nBreak"],
[{y:0.5},"~\n`","!\n1","@\n2","#\n3","$\n4","%\n5","^\n6","&\n7","*\n8","(\n9",")\n0","_\n-","+\n=",{w:2},"Backspace",{x:0.25},"Insert","Home","PgUp",{x:0.25},"Num Lock","/","*","-"],
[{w:1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\n[","}\n]",{w:1.5},"|\n\\",{x:0.25},"Delete","End","PgDn",{x:0.25},"7\nHome","8\n↑","9\nPgUp",{h:2},"+"],
[{w:1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\n;","\"\n'",{w:2.25},"Enter",{x:3.5},"4\n←","5","6\n→"],
[{w:2.25},"Shift","Z","X","C","V","B","N","M","<\n,",">\n.","?\n/",{w:2.75},"Shift",{x:1.25},"↑",{x:1.25},"1\nEnd","2\n↓","3\nPgDn",{h:2},"Enter"],
[{w:1.25},"Ctrl",{w:1.25},"Win",{w:1.25},"Alt",{a:7,w:6.25},"",{a:4,w:1.25},"Alt",{w:1.25},"Win",{w:1.25},"Menu",{w:1.25},"Ctrl",{x:0.25},"←","↓","→",{x:0.25,w:2},"0\nIns",".\nDel"]
*/
