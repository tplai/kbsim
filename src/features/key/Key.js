import React from 'react'
import PropTypes from 'prop-types'
import styles from './Key.module.css';

// keysize must be divisble by 9
const keysize = 54;

const Key = ({legend, sublegend, width, height, x, y, keytopcolor, keybordercolor, textcolor}) => (
  <div className={styles.keycap}>
    <div
      className={styles.keyborder}
      style={{
        left: x * keysize,
        top: y * keysize,
        width: keysize * width,
        height: keysize * height,
        backgroundColor: keybordercolor,
      }}
    />
    <div
      className={styles.keytop}
      style={{
        left: x * keysize + keysize / 9,
        top: y * keysize + keysize / 18,
        width: keysize * width - keysize * 2 / 9,
        height: keysize * height - keysize * 2 / 9,
        backgroundColor: keytopcolor,
      }}
    />
    <div
      className={styles.keylegends}
      style={{
        left: x * keysize + keysize / 9,
        top: y * keysize + keysize / 18,
        width: keysize * width - keysize * 2 / 9,
        height: keysize * height - keysize * 2 / 9,
      }}
    >
      <div
        className={styles.keylegend}
        style={{
          width: keysize * width - keysize * 3 / 9,
          maxWidth: keysize * width - keysize * 3 / 9,
          height: keysize * height - keysize * 3 / 9,
        }}
      >
        <div
          style={{
            width: keysize * width - keysize * 3 / 9,
            height: keysize * height - keysize * 3 / 9,
            color: textcolor,
          }}>
          {legend}
        </div>
      </div>
      <div
        className={styles.keysublegend}
        style={{
          width: keysize * width - keysize * 3 / 9,
          height: keysize * height - keysize * 3 / 9,
          color: textcolor,
        }}
      >
        <div
          style={{
            width: keysize * width - keysize * 3 / 9,
            maxWidth: keysize * width - keysize * 3 / 9,
            height: keysize * height - keysize * 3 / 9,
          }}>
          {sublegend}
        </div>
      </div>
    </div>
  </div>
)

Key.propTypes = {
  legend: PropTypes.string.isRequired,
  sublegend: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  keytopcolor: PropTypes.string.isRequired,
  keybordercolor: PropTypes.string.isRequired,
  textcolor: PropTypes.string.isRequired,
}

export default Key
