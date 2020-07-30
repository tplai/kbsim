import React from 'react'
import styles from './KeyContainer.module.css';

const KeyContainer = ({children}) => (
  <div className={styles.keycontainer}>
    {children}
  </div>
)

export default KeyContainer
