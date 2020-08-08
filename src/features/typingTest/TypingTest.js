import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  generateWords,
  incrementWord,
  shiftWords,
  classifyWord,
  spellCheck,
  tick,
  startTimer,
  stopTimer,
  showResults,
  resetTimer,
  selectTime,
  selectWords,
  selectWordIndex,
  selectStarted,
} from './typingTestSlice.js';
import Word from './../word/Word.js';
import store from './../../app/store';
import styles from './TypingTest.module.css';

const raceTime = 10000;

store.dispatch(generateWords());
store.dispatch(resetTimer({time: raceTime / 1000}));

export function TypingTest() {
  const words = useSelector(selectWords);
  const wordIndex = useSelector(selectWordIndex);
  const started = useSelector(selectStarted);
  const timeLeft = useSelector(selectTime);
  const inputRef = useRef();

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState("");
  // const [started, setStarted] = useState(false);
  // const [timer, setTimer] = useState();

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
  // shift the words when the first row is finished and spellcheck
  useEffect(() => {
    if (timeLeft > 0) {
      if (wordObject[wordIndex].ref && wordObject[wordIndex].ref.current.offsetTop > 0) {
        dispatch(shiftWords());
      }
      dispatch(spellCheck({input: inputVal}));
    }
  }, [inputVal]);

  // intended behavior: go to next word when space is pressed & time is left
  // if the cursor is in the middle of the word, still clear the input and go next word
  // additionally, start the timer if it's not space and it hasn't already
  const handleKeyPress =  (e) => {
    if (timeLeft > 0) {
      if (e.key === ' ') {
        if (inputVal) {
          // inputVal is one character behind, so we don't have to trim inputVal
          dispatch(classifyWord({index: wordIndex, input: inputVal}));
          dispatch(incrementWord());
        }
        // console.log("whos");
        setInputVal("");
      }
      else if (!started) {
        // console.log("starting timer");
        dispatch(startTimer());
        timer();
      }
    }
    // console.log(started);
  }

  // binds the inputVal hook to the input
  const handleChange = (e) => {
    let input = e.target.value;
    if (timeLeft > 0) {
      input = input.trim();
    }
    setInputVal(input);
    // }
    // else {
    //   setInputVal(e.target.value);
    // }
  }

  const redo = () => {
    inputRef.current.focus();
    setInputVal("");
    dispatch(resetTimer({ time: raceTime / 1000}));
    dispatch(generateWords());
  }

  const timer = () => {
    let endTime = parseInt(new Date().getTime()) + raceTime;
    // let interval = 1000;
    // let interval = setTimeout(step, interval)
    // console.log(endTime);
    let step = setInterval(() => {
      let timeLeft = endTime - parseInt(new Date().getTime());
      dispatch(tick());
      // console.log(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(step);
        dispatch(stopTimer());
        dispatch(showResults());
        // console.log("done");
      }
    }, 1000)
  }

  // int
  const parseSecond = (time) => {
    // console.log(time);
    let seconds = time % 60;
    if (seconds >= 10) {
      return seconds;
    }
    else if (seconds < 10 && seconds > 0){
      // if (toString(seconds).length == 1) {
        // console.log(`0${seconds}`);
        return `0${seconds}`;
      // }
    }
    else {
      // console.log("XD");
      return `00`;
    }
  }

  const parseMinute = (time) => {
    // console.log(time - (time));
    return (time - (time % 60)) / 60;
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
            <span className={styles.time}>{parseMinute(timeLeft)}:{parseSecond(timeLeft)}</span>
            <button className={styles.redo} onClick={() => redo()}>Redo</button>
          </span>
        </div>
      </div>
    </div>
  );
}
