import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  highlightColor,
  selectLayout,
  selectKeyboardWidth,
  selectKeyboardHeight,
  selectBorderWidth,
  selectBorderHeight,
  selectHighlight,
} from './keyGeneratorSlice';
import Key from './../key/Key.js'
import styles from './KeyGenerator.module.css';

let keySize = 54;

export function KeyGenerator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);

  // dimensions of keyboard and border
  const keyboardWidth = useSelector(selectKeyboardWidth);
  const keyboardHeight = useSelector(selectKeyboardHeight);
  const borderWidth = useSelector(selectBorderWidth);
  const borderHeight = useSelector(selectBorderHeight);

  // highlight for indicating if KLE was formatted correctly
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  const [highlightType, setHighlight] = useState();

  return (
    <div>
      <div className={styles.keyboardcontainer}>
        <div
          className={styles.keyboard}
          style={{
            width: (keyboardWidth + borderWidth * 2) * keySize,
            height: (keyboardHeight + borderHeight * 2) * keySize,
            paddingTop: borderHeight * keySize,
            paddingBottom: borderHeight * keySize,
            paddingLeft: borderWidth * keySize,
            paddingRight: borderWidth * keySize,
          }}
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
