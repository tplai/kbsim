import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  highlightColor,
  selectLayout,
  selectHighlight,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const layout = useSelector(selectLayout);
  const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [kleValue, setKleValue] = useState();
  const [highlightType, setHighlight] = useState();

  // <button
  // className={styles.button}
  // aria-label="Increment value"
  // onClick={() => dispatch(increment())}
  // >
  // +
  // </button>
  // onChange={e => setIncrementAmount(e.target.value)}

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{layout}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.value}>{highlight}</span>
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
