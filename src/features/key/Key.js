import React from 'react'
import PropTypes from 'prop-types'
import styles from './Key.module.css';

// keysize must be divisble by 9
let keysize = 54;

const Key = ({legend, sublegend, width, height, x, y}) => {
  <div className={styles.keycap}>
    <div
      className={styles.keyborder}
      style={{
        left: x * keysize,
        top: y * keysize,
        width: keysize * width,
        height: keysize * height,
      }}
    />
    <div
      className={styles.keytop}
      style={{
        left: x * keysize * width + keysize / 9,
        top: y * keysize * height + keysize / 18,
        width: keysize * width - keysize * 2 / 9,
        height: keysize * height - keysize * 2 / 9,
      }}
    />
    <div
      className={styles.keylabels}
      style={{
        left: x * keysize * width + keysize / 9,
        top: y * keysize * height + keysize / 18,
        width: keysize * width - keysize * 2 / 9,
        height: keysize * height - keysize * 2 / 9,
      }}
    >
      <div
        className={styles.keylabel}
        style={{
          width: keysize * width - keysize * 3 / 9,
          maxWidth: keysize * width - keysize * 3 / 9,
          height: keysize * height - keysize * 3/ 9,
        }}
      >
        {legend}
      </div>
      <div
        className={styles.keylabel}
        style={{
          width: keysize * width - keysize * 3 / 9,
          maxWidth: keysize * width - keysize * 3 / 9,
          height: keysize * height - keysize * 3/ 9,
        }}
      >
        {sublegend}
      </div>
    </div>
  </div>
}

Todo.propTypes = {
  legend: PropTypes.func.isRequired,
  sublegend: PropTypes.func.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired,
  height: PropTypes.func.isRequired,
}

export default Key
