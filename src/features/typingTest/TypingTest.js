import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  generateWords,
  incrementWord,
  shiftWords,
  classifyWord,
  spellCheck,
  tick,
  startTimer,
  endTimer,
  calcResults,
  resetTimer,
  selectTime,
  selectWords,
  selectWordIndex,
  selectStarted,
  selectFinished,
  selectStats
} from './typingTestSlice.js';
import Word from './../word/Word.js';
import store from '../store/store';
import styles from './TypingTest.module.css';

const raceTime = 60000;

store.dispatch(generateWords());
store.dispatch(resetTimer({ time: raceTime / 1000 }));

function TypingTest({ currentTheme, theme }) {
  const words = useSelector(selectWords);
  const wordIndex = useSelector(selectWordIndex);
  const timeLeft = useSelector(selectTime);
  const started = useSelector(selectStarted);
  const finished = useSelector(selectFinished);
  const stats = useSelector(selectStats);

  const inputRef = useRef();

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState("");

  const [ticker, setTicker] = useState(null);
  
  let wordObject = words.map((word, index) => {
    return (
      <Word
        key={index}
        focused={word.focused}
        status={word.status}
        text={word.text}
        theme={currentTheme}
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
      dispatch(spellCheck({ input: inputVal }));
    }
  }, [inputVal]);

  // intended behavior: go to next word when space is pressed & time is left
  // if the cursor is in the middle of the word, still clear the input and go next word
  // additionally, start the timer if it's not space and it hasn't already
  const handleKeyPress = (e) => {
    if (timeLeft > 0) {
      if (e.key === ' ') {
        if (inputVal) {
          // inputVal is one character behind, so we don't have to trim inputVal
          dispatch(classifyWord({ index: wordIndex, input: inputVal }));
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

  // stop the current timer and reset the time and words
  const redo = () => {
    clearInterval(ticker);
    inputRef.current.focus();
    setInputVal("");
    dispatch(resetTimer({ time: raceTime / 1000 }));
    dispatch(generateWords());
  }

  // countdown
  const timer = () => {
    let endTime = parseInt(new Date().getTime()) + raceTime;
    setTicker(setInterval(() => {
      let timeLeft = endTime - parseInt(new Date().getTime());
      dispatch(tick());
      if (timeLeft <= 0) {
        clearInterval(ticker);
        dispatch(endTimer());
      }
    }, 1000));
  }

  const parseSecond = (time) => {
    // console.log(time);
    let seconds = time % 60;
    if (seconds >= 10) {
      return seconds;
    }
    else if (seconds < 10 && seconds > 0) {
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
    if (time > 0) {
      return (time - (time % 60)) / 60;
    }
    else {
      return "0";
    }
  }

  return (
    <div 
      className={styles.typingcontainer}
      style={{
        backgroundColor: theme.background,
        borderColor: theme.boxBorder        
      }}
    >
      <div>
        <div 
          className={styles.wordcontainer}
        >
          {!finished
            ? <div className={styles.wordarea}>
                <div className={styles.words}>
                  {wordObject}
                </div>
              </div>
            : <div
                className={styles.resultarea}
                style={{
                  color: theme.text
                }}
              >
                <div className={styles.results}>
                  <div className={styles.resultcol} aria-label="Words per minute">
                    <div className={styles.wpm}>
                      {stats.wpm} WPM
                    </div>
                  </div>
                  <div className={styles.resultcol}>
                    <div className={styles.accuracy}>
                      {`${stats.accuracy}% accuracy`}
                    </div>
                  </div>
                  <div className={styles.resultcol}>
                    <div className={styles.keystrokes}>
                      <span className={styles.correctresult}>{stats.keystrokes.correct}</span> | <span className={styles.incorrectresult}>{stats.keystrokes.incorrect}</span> keystrokes
                    </div>
                  </div>
                  <div className={styles.resultcol}>
                    <div className={styles.wordresult}>
                      <span className={styles.correctresult}>{stats.words.correct}</span> | <span className={styles.incorrectresult}>{stats.words.incorrect}</span> words
                    </div>
                  </div>
                </div>
              </div>
          }

        </div>
        <div className={`${styles.inputbar} ${currentTheme == "light" ? styles.light : styles.dark}`}>
          <input
            className={styles.typinginput}
            style={{
              backgroundColor: theme.background,
              color: theme.text
            }}
            value={inputVal}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            autoFocus={true}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Typing input"
            ref={inputRef}
          />
          <span className={styles.toolbar}>
            <span 
              className={styles.time}
              style={{
                backgroundColor: theme.timer,
                color: theme.timerText
              }}
            >
              {parseMinute(timeLeft)}:{parseSecond(timeLeft)}
            </span>
            <button 
              className={`${styles.redo} ${currentTheme == "light" ? styles.light : styles.dark}`} 
              onClick={() => redo()}
              style={{
                backgroundColor: theme.background,
                color: theme.text
              }}
            >
              Redo
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      currentTheme: state.themeProvider.current,
      theme: state.themeProvider.theme
  }
}

export default connect(mapStateToProps)(TypingTest);
