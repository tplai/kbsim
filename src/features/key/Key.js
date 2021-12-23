import React from 'react'
import PropTypes from 'prop-types'
import styles from './Key.module.css';

// keysize must be divisble by 9
const keysize = 54;

const Key = ({ className, legend, sublegend, width, height, x, y, keytopcolor, keybordercolor, textcolor, pressed, mouseDown, mouseUp }) => (
  <div className={styles.keycap} onMouseDown={() => { mouseDown(className) }} onMouseUp={() => { mouseUp(className) }}>
    <div
      className={styles.keyborder}
      style={{
        left: x * keysize,
        top: y * keysize,
        width: width * keysize,
        height: height * keysize,
        backgroundColor: keybordercolor,
      }}
    />
    <div
      className={styles.keytop}
      style={{
        left: x * keysize + keysize / 9,
        top: y * keysize + keysize / 18,
        width: width * keysize - keysize * 2 / 9,
        height: height * keysize - keysize * 2 / 9,
        backgroundColor: pressed ? keybordercolor : keytopcolor,
      }}
    />
    <div
      className={styles.keylegends}
      style={{
        left: x * keysize + keysize / 9,
        top: y * keysize + keysize / 18,
        width: width * keysize - keysize * 2 / 9,
        height: height * keysize - keysize * 2 / 9,
      }}
    >
      <div
        className={styles.keylegend}
        style={{
          width: width * keysize - keysize * 3 / 9,
          maxWidth: width * keysize - keysize * 3 / 9,
          height: height * keysize - keysize * 3 / 9,
        }}
      >
        <div
          style={{
            width: width * keysize - keysize * 3 / 9,
            height: height * keysize - keysize * 3 / 9,
            color: textcolor,
          }}>
          {legend}
        </div>
      </div>
      <div
        className={styles.keysublegend}
        style={{
          width: width * keysize - keysize * 3 / 9,
          height: height * keysize - keysize * 3 / 9,
          color: textcolor,
        }}
      >
        <div
          style={{
            width: width * keysize - keysize * 3 / 9,
            maxWidth: width * keysize - keysize * 3 / 9,
            height: height * keysize - keysize * 3 / 9,
          }}>
          {sublegend}
        </div>
      </div>
    </div>
  </div>
)

Key.propTypes = {
  className: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired,
  sublegend: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  keytopcolor: PropTypes.string.isRequired,
  keybordercolor: PropTypes.string.isRequired,
  textcolor: PropTypes.string.isRequired,
  pressed: PropTypes.bool.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseUp: PropTypes.func.isRequired,
}

export default Key
