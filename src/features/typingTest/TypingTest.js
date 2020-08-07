import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  generateWords,
  incrementWord,
  keyDown,
  tick,
  redo,
  selectTime,
  selectWords,
  selectWordIndex,
} from './typingTestSlice.js';
// import Word from './../word/Word.js';
import styles from './TypingTest.module.css';
import store from './../../app/store';

store.dispatch(generateWords());

export function TypingTest() {
  const words = useSelector(selectWords);
  const timeLeft = useSelector(selectTime);
  const wordIndex = useSelector(selectWordIndex);
  // const wordRef = React.createRef();

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState("");
  // const [startRace, setStartRace] = useState(false);

  let wordObject = words.map((word, index) => {
    return(
      <span
        key={index}
        ref={word.focused ? useRef() : null}
        className={`${styles.word} ${word.focused ? styles.active : ''} ${styles[word.status]}`}
      >
        {word.text}
      </span>
    )
    // return(
    //   <Word
    //     key={index}
    //     focused={word.focused}
    //     status={word.status}
    //     text={word.text}
    //     ref={word.focused ? useRef() : null}
    //   />
    // )
  });

  const handleChange = (e) => {
    setInputVal(e.target.value.trim());
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      setInputVal("");
      if (inputVal) {
        dispatch(incrementWord());
      }
      // console.log(wordIndex);
      // console.log();
      // let wordIndex = store.getState().typingTest.index;
      console.log(wordObject[wordIndex].ref.current.offsetTop);
      // if (wordObject[wordIndex].ref.current.offsetTop > )
      // console.log(wordObject[wordIndex + 1].ref);
      // setTimeout(() => console.log(wordIndex), 2000)
      // console.log(wordIndex);
      // console.log(wordRef);
      // console.log(wordObject[wordIndex]);
    }
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
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
