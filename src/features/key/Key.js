import React from 'react'
import PropTypes from 'prop-types'
import styles from './Key.module.css';

// keysize must be divisble by 9
let keysize = 54;

// function for lightening/darkening keycap tops
function LightenDarkenColor(color, amt) {
  if (color.charAt(0) == "#") {
    color = color.substring(1, color.length);
  }
  let num = parseInt(color, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00FF) + amt;
  let g = (num & 0x0000FF) + amt;
  let newColor = g | (b << 8) | (r << 16);
  return "#" + newColor.toString(16);
}

const Key = ({legend, sublegend, width, height, x, y, keycolor, textcolor}) => (
  <div className={styles.keycap}>
    <div
      className={styles.keyborder}
      style={{
        left: x * keysize,
        top: y * keysize,
        width: keysize * width,
        height: keysize * height,
        backgroundColor: keycolor,
      }}
    />
    <div
      className={styles.keytop}
      style={{
        left: x * keysize + keysize / 9,
        top: y * keysize + keysize / 18,
        width: keysize * width - keysize * 2 / 9,
        height: keysize * height - keysize * 2 / 9,
        backgroundColor: LightenDarkenColor(keycolor, 10),
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
  keycolor: PropTypes.string.isRequired,
  textcolor: PropTypes.string.isRequired,
}

export default Key
