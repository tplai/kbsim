import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  keyDown,
  keyUp,
  highlightColor,
  selectLayout,
  selectLocations,
  selectKeyboardStyle,
  selectHighlight,
} from './keySimulatorSlice';
import { keynames } from './keycodeMaps.js';
// import { keySounds } from './audioFiles.js';
import { keyPresets } from './keyPresets.js'
import Key from './../key/Key.js';
import store from './../../app/store';
import styles from './KeySimulator.module.css';

// audio imports
import keySpacePress from './../../audio/holypanda/press/SPACE.mp3';
import keySpaceRelease from './../../audio/holypanda/release/SPACE.mp3';
import keyEnterPress from './../../audio/holypanda/press/ENTER.mp3';
import keyEnterRelease from './../../audio/holypanda/release/ENTER.mp3';
import keyBackspacePress from './../../audio/holypanda/press/BACKSPACE.mp3';
import keyBackspaceRelease from './../../audio/holypanda/release/BACKSPACE.mp3';
import keyGenericPress from './../../audio/holypanda/press/GENERIC.mp3';
import keyGenericRelease from './../../audio/holypanda/release/GENERIC.mp3';

export function KeySimulator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);
  // x y indices of legends
  const keyLocations = useSelector(selectLocations);
  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);

  // highlight for indicating if KLE was formatted correctly
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  // const [inputValue, setInputValue] = useState()
  const [highlightType, setHighlight] = useState();

  const keyObject = layout.map((row, index) => {
    return(<div className={styles.keyrow} key={index}>
      {
        row.map((key) => {
          return(
            <Key
              key={key.keyid}
              className={key.class}
              legend={key.legend}
              sublegend={key.sublegend}
              width={key.width}
              height={key.height}
              x={key.x}
              y={key.y}
              keytopcolor={key.keytopcolor}
              keybordercolor={key.keybordercolor}
              textcolor={key.textcolor}
              pressed={key.pressed}
            />
          )
        })
      }
      </div>)
    });

  // bad performance if audios are replayed
  const keySounds = {
    press: {
      SPACE: keySpacePress,
      ENTER: keyEnterPress,
      BACKSPACE: keyBackspacePress,
      GENERIC: keyGenericPress,
    },
    release: {
      SPACE: keySpacePress,
      ENTER: keyEnterPress,
      BACKSPACE: keyBackspacePress,
      GENERIC: keyGenericPress,
    },
  }

  const handleKeyDown = (e) => {
    let tree = store.getState();
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]]
    for (let coords in coordArray) {
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
      };
      dispatch(keyDown(action));

      if (!tree.keySimulator.pressedKeys.includes(keynames[e.keyCode])) {
        if (keynames[e.keyCode] in keySounds.press) {
          new Audio(keySounds.press[keynames[e.keyCode]]).play();
        }
        else {
          new Audio(keySounds.press.GENERIC).play();
        }
      }
    }
  }
  const handleKeyUp = (e) => {
    let tree = store.getState();
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]]
    for (let coords in tree.keySimulator.keyLocations[keynames[e.keyCode]]) {
      // console.log(layout[coordArray[coords][0]][coordArray[coords][1]]);
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
      };
      dispatch(keyUp(action));

      if (keynames[e.keyCode] == "SPACE") {
        // let audio = new Audio(keyReleaseSounds);
        new Audio(keySpaceRelease).play();
      }
      else {
        new Audio(keyGenericRelease).play();
      }
    }
  }

  return (
    <div>
      <div
        className={styles.keycontainer}
        onKeyDown={e => handleKeyDown(e)}
        onKeyUp={e => handleKeyUp(e)}
        tabIndex="0"
      >
        <div
          className={styles.keyboard}
          style={keyboardStyle}
        >
          {keyObject}
        </div>
      </div>
      <div className={styles.row}>
        <textarea
          className={styles.textarea}
          aria-label="Set increment amount"
          onChange={e => setKleValue(e.target.value)}
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(parseKLE(kleValue))
          }
          aria-label="Input KLE raw data"
        >
          Set Layout
        </button>
      </div>
    </div>
  );
}
