import React from 'react'
import styles from './KeyContainer.module.css';

const KeyContainer = ({children}) => {
  const handleKeyDown = (e) => {
    console.log(e.keyCode);
  }
  const handleKeyUp = (e) => {
    console.log(e.keyCode);
  }
  return (
    <div
      className={styles.keycontainer}
      onKeyDown={e => handleKeyDown(e)}
      onKeyUp={e => handleKeyUp(e)}
      tabindex="0"
    >
      {children}
    </div>
  )
}

export default KeyContainer
