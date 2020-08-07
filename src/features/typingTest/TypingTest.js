import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  generateWords,
  incrementWord,
  shiftWords,
  classifyWord,
  spellCheck,
  tick,
  redo,
  selectTime,
  selectWords,
  selectWordIndex,
} from './typingTestSlice.js';
import Word from './../word/Word.js';
import store from './../../app/store';
import styles from './TypingTest.module.css';

store.dispatch(generateWords());

export function TypingTest() {
  const words = useSelector(selectWords);
  const timeLeft = useSelector(selectTime);
  const wordIndex = useSelector(selectWordIndex);
  const inputRef = useRef();

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState("");
  // const [startRace, setStartRace] = useState(false);

  let wordObject = words.map((word, index) => {
    return(
      <Word
        key={index}
        focused={word.focused}
        status={word.status}
        text={word.text}
        ref={word.focused ? useRef() : null}
      />
    )
  });


  // subscribe to inputVal - execute this if inputVal changes
  // shift the words when the first row is finished
  useEffect(() => {
    if (wordObject[wordIndex].ref && wordObject[wordIndex].ref.current.offsetTop > 0) {
      dispatch(shiftWords());
    }
    dispatch(spellCheck({input: inputVal}));
  }, [inputVal]);

  // intended behavior: go to next word when space is pressed
  // if the cursor is in the middle of the word, still clear the input and go next word
  const handleKeyPress =  (e) => {
    if (e.key === ' ') {
      if (inputVal) {
        // inputVal is one character behind, so we don't have to trim inputVal
        dispatch(classifyWord({index: wordIndex, input: inputVal}));
        dispatch(incrementWord());
      }
      setInputVal("");
    }
  }

  // binds the inputVal hook to the input
  const handleChange = (e) => {
    setInputVal(e.target.value.trim());
  }

  const redo = () => {
    inputRef.current.focus();
    setInputVal("");
    dispatch(generateWords());
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
      <div>
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
            onKeyPress={handleKeyPress}
            autoFocus={true}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            ref={inputRef}
          />
          <span className={styles.toolbar}>
            <span className={styles.time}>{timeLeft ? timeLeft / 60 : "x"}:{timeLeft ? parseSecond(timeLeft) : "xx"}</span>
            <button className={styles.redo} onClick={() => redo()}>Redo</button>
          </span>
        </div>
      </div>
    </div>
  );
}
