import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wordList, shuffle } from './wordlist.js';
import styles from './TypingTest.module.css';

export function TypingTest() {

  const handleKeyDown = (e) => {

  }
  const handleKeyUp = (e) => {

  }

  return (
    <div className={styles.typingcontainer}>
      <div className={styles.wordcontainer}>
        <div className={styles.wordarea}>
          <div className={styles.words}>
            <span className={`${styles.word} ${styles.active}`}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
            <span className={styles.word}>word</span>
          </div>
        </div>
      </div>
      <div className={styles.inputbar}>
        <input
          className={styles.typinginput}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <span className={styles.toolbar}>
          <span className={styles.time}>1:00</span>
          <button disabled="">Redo</button>
        </span>
      </div>
    </div>
  );
}
