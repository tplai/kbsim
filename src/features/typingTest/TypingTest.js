import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  keyDown,
  tick,
  redo,
  selectTime,
  selectWords,
} from './typingTestSlice.js';
import Word from './../word/Word.js';
import styles from './TypingTest.module.css';

export function TypingTest() {
  const words = useSelector(selectWords);
  const timeLeft = useSelector(selectTime);

  const dispatch = useDispatch();

  const [inputVal, setInput] = useState("");
  const [startRace, setStartRace] = useState(false);

  let wordObject = words.map((word, index) => {
    return(
      <Word key={index} focused={false} status={"default"} text={word}/>
    )
  });

  const handleKeyDown = (e) => {
    // console.log(e.target.value);
    // setInput()
  }

  const handleKeyUp = (e) => {

  }

  // int
  const parseSecond = (time) => {
    let seconds = time % 60;
    if (seconds >= 10) {
      return toString(seconds);
    }
    else {
      // if (toString(seconds).length == 1) {
        // console.log(`0${seconds}`);
        return `0${seconds}`;
      // }
    }
  }

  // <Word focused={true} status={"correct"} text={"lorem"}/>
  // <Word focused={true} status={"incorrect"} text={"lorem"}/>
  // <Word focused={false} status={"correct"} text={"lorem"}/>
  // <Word focused={false} status={"blank"} text={"lorem"}/>
  // <Word focused={false} status={"blank"} text={"lorem"}/>

  return (
    <div className={styles.typingcontainer}>
      <div className={styles.wordcontainer}>
        <div className={styles.wordarea}>
          <div className={styles.words}>
              {wordObject}
          </div>
        </div>
      </div>
      <div className={styles.inputbar}>
        <input
          className={styles.typinginput}
          onChange={handleKeyDown}
          autoFocus={true}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <span className={styles.toolbar}>
          <span className={styles.time}>{timeLeft ? timeLeft / 60 : "x"}:{timeLeft ? parseSecond(timeLeft) : "xx"}</span>
          <button disabled="">Redo</button>
        </span>
      </div>
    </div>
  );
}
