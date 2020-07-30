import React from 'react'
import styles from './KeyContainer.module.css';



const KeyContainer = ({children}) => {
  const handleKeyDown = e => {
    console.log(" XD");
  }
  return (
    <div tabindex="0"
      className={styles.keycontainer}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

export default KeyContainer
