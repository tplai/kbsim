import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wordList, shuffle } from './wordlist.js';
import styles from './TypingTest.module.css';

export function TypingTest() {

  const [inputVal, setInput] = useState("");

  const handleKeyDown = (e) => {
    // console.log(e.target.value);
    // setInput()
  }

  const handleKeyUp = (e) => {

  }

  return (
    <div className={styles.typingcontainer}>
      <div className={styles.wordcontainer}>
        <div className={styles.wordarea}>
          <div className={styles.words}>
            <span className={`${styles.word} ${styles.active}`}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>lorum</span>
            <span className={styles.word}>ipsum</span>
            <span className={styles.word}>ipsum</span>
          </div>
        </div>
      </div>
      <div className={styles.inputbar}>
        <input
          className={styles.typinginput}
          onChange={handleKeyDown}
          autoFocus="true"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <span className={styles.toolbar}>
          <span className={styles.time}>1:00</span>
          <button disabled="">Redo</button>
        </span>
      </div>
    </div>
  );
}
