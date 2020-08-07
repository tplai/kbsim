import React from 'react'
import PropTypes from 'prop-types'
import styles from './Word.module.css';

const Word = ({focused, status, text}) => (
  <span
    className={`${styles.word} ${focused ? styles.active : ''} ${styles[status]}`}
  >
    {text}
  </span>
)

Word.propTypes = {
  // className: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Word
