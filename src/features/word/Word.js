import React, { useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Word.module.css';

// forwardRef to get a ref to the span
const Word = React.forwardRef((props, ref) => (
  <span
    ref={ref}
    className={`
      ${styles.word}
      ${props.focused ? styles.active : ''}
      ${styles[props.theme]}
      ${styles[props.status]}`}
  >
    {props.text}
  </span>
));

Word.propTypes = {
  // className: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.string,
}

export default Word
