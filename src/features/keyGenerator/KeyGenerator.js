import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  renderKeys,
  highlightColor,
  selectLayout,
  selectHighlight,
} from './keyGeneratorSlice';
import Key from './../key/Key.js'
import styles from './KeyGenerator.module.css';

export function KeyGenerator() {
  const layout = useSelector(selectLayout);
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  const [highlightType, setHighlight] = useState();

  return (
    <div>
      <div className={styles.keyboard}>
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
