import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  highlightColor,
  selectLayout,
  selectKeyboardStyle,
  selectHighlight,
} from './keySimulatorSlice';
import { keynames } from './keycodeMaps.js';
import { keyPresets } from './keyPresets.js'
import Key from './../key/Key.js';
import store from './../../app/store';
import styles from './KeySimulator.module.css';

export function KeySimulator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);

  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);

  // highlight for indicating if KLE was formatted correctly
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  // const [inputValue, setInputValue] = useState()
  const [highlightType, setHighlight] = useState();

  const keyObject = layout.map((row, index) => {
    return(<div className={styles.keyrow}>
      {
        row.map((key) => {
          return(
            <Key
              legend={key.legend}
              sublegend={key.sublegend}
              width={key.width}
              height={key.height}
              x={key.x}
              y={key.y}
              keytopcolor={key.keytopcolor}
              keybordercolor={key.keybordercolor}
              textcolor={key.textcolor}
            />
          )
        })
      }
      </div>)
    });

  let keyPresses = [];

  const handleKeyDown = (e) => {
    // setKeyDown(e.keyCode);
    console.log(keynames[e.keyCode]);
    // console.log(keyObject[0].props.children);
    // console.log(store.getState());
    // dispatch(handleKeyDown(keyDown));
  }
  const handleKeyUp = (e) => {
    // console.log(e.keyCode);
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
          Parse Raw KLE
        </button>
      </div>
    </div>
  );
}
