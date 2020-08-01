import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  highlightColor,
  selectLayout,
  selectKeyboardStyle,
  selectBorderHeight,
  selectHighlight,
} from './keyGeneratorSlice';
import { keynames } from './keynames.js';
import Key from './../key/Key.js';
import styles from './KeyGenerator.module.css';

export function KeyGenerator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);

  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);

  // highlight for indicating if KLE was formatted correctly
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  const [highlightType, setHighlight] = useState();

  let keyPresses = [];

  const handleKeyDown = (e) => {
    // setKeyDown(e.keyCode);
    console.log(keynames[e.keyCode]);
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
          {
            layout.map((row, index) => {
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
                        keycolor={key.keycolor}
                        textcolor={key.textcolor}
                      />
                    )
                  })
                }
                </div>)
              })
            }
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
