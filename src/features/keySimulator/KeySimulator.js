import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  keyDown,
  keyUp,
  setKeyboardColor,
  selectLayout,
  selectLocations,
  selectKeyboardStyle,
} from './keySimulatorSlice';
import { keynames } from './../keyModules/keycodeMaps.js';
import { keySounds } from './../audioModules/audioModule.js';
import { keyPresets } from './../keyModules/keyPresets.js'
import { keyboardColors } from './../keyModules/keyboardColors.js'
import { TypingTest } from './../typingTest/TypingTest.js';
import Key from './../key/Key.js';
import store from './../../app/store';
import styles from './KeySimulator.module.css';

// initially render the keys
store.dispatch(parseKLE(keyPresets[0].kle));
// intially render the keyboard color
store.dispatch(setKeyboardColor(keyboardColors[0].background));

export function KeySimulator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);
  // x y indices of legends
  const keyLocations = useSelector(selectLocations);
  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);

  const dispatch = useDispatch();

  const [kleValue, setKleValue] = useState();
  // set intial switch to first keysound
  const [switchValue, setSwitchValue] = useState("0");

  const keyObject = layout.map((row, index) => {
    return(<div className={styles.keyrow} key={index}>
      {
        row.map((key) => {
          return(
            <Key
              key={key.keyid}
              className={key.class}
              legend={key.legend}
              sublegend={key.sublegend}
              width={key.width}
              height={key.height}
              x={key.x}
              y={key.y}
              keytopcolor={key.keytopcolor}
              keybordercolor={key.keybordercolor}
              textcolor={key.textcolor}
              pressed={key.pressed}
            />
          )
        })
      }
      </div>)
    });

  const handleKeyDown = (e) => {
    // prevent function keys and alt from affecting simulator
    if (e.keyCode === 18 || e.keyCode === 112 ||
        e.keyCode === 114 || e.keyCode === 116 || e.keyCode === 117 ||
        e.keyCode === 121 || e.keyCode === 122 || e.keyCode === 123) {
        e.preventDefault();
    }
    let tree = store.getState();
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]];
    for (let coords in coordArray) {
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
        keycode: e.keyCode,
      };
      dispatch(keyDown(action));
    }
    // if the key is not pressed and valid switch is selected
    if (coordArray && !tree.keySimulator.pressedKeys.includes(e.keyCode) && keySounds[switchValue]) {
      // play a sound
      if (keynames[e.keyCode] in keySounds[switchValue].press) {
        new Audio(keySounds[switchValue].press[keynames[e.keyCode]]).play();
      }
      else {
        if (coordArray) {
          switch(parseInt(coordArray[0][0])) {
            case 0:
              new Audio(keySounds[switchValue].press.GENERICR0).play();
              break;
            case 1:
              new Audio(keySounds[switchValue].press.GENERICR1).play();
              break;
            case 2:
              new Audio(keySounds[switchValue].press.GENERICR2).play();
              break;
            case 3:
              new Audio(keySounds[switchValue].press.GENERICR3).play();
              break;
            case 4:
              new Audio(keySounds[switchValue].press.GENERICR4).play();
              break;
            default:
              new Audio(keySounds[switchValue].press.GENERICR4).play();
              break;
          }
        }
        // key not found
        else {
          new Audio(keySounds[switchValue].press.GENERICR4).play();
        }
      }
    }

  }
  const handleKeyUp = (e) => {
    let tree = store.getState();
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]]
    for (let coords in tree.keySimulator.keyLocations[keynames[e.keyCode]]) {
      // console.log(layout[coordArray[coords][0]][coordArray[coords][1]]);
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
        keycode: e.keyCode,
      };
      dispatch(keyUp(action));
    }
    // if a valid switch is selected
    if (switchValue in keySounds) {
      if (keynames[e.keyCode] in keySounds[switchValue].press) {
        // let audio = new Audio(keyReleaseSounds);
        new Audio(keySounds[switchValue].release[keynames[e.keyCode]]).play();
      }
      else {
        new Audio(keySounds[switchValue].release.GENERIC).play();
      }
    }
  }

  return (
    <div>
      <div
        className={styles.keycontainer}
        onKeyDown={e => handleKeyDown(e)}
        onKeyUp={e => handleKeyUp(e)}
        tabIndex="0"
      >
        <TypingTest/>

        <div className={styles.selectcontainer}>
          <div className={styles.selectarea}>
            <div className={styles.selectcol}>
              <select
                className={styles.dropdown}
                aria-label="Switch Type"
                onChange={e => setSwitchValue(e.target.value)}
                defaultValue="0"
              >
                {keySounds.map((sound, index) => {
                    return (
                      <option value={index} key={sound.key}>{sound.caption}</option>
                    );
                })}
              </select>
            </div>

            <div className={styles.selectcol}>
              <select
                className={styles.dropdown}
                aria-label="Keyboard Layout"
                onChange={e => dispatch(parseKLE(keyPresets[e.target.value].kle))}
                defaultValue="olivia_sf"
              >
                {keyPresets.map((preset, index) => {
                    return (
                      <option value={index} key={preset.key}>{preset.caption}</option>
                    );
                })}
              </select>
            </div>
            <div className={styles.selectcol}>
              <select
                className={styles.dropdown}
                aria-label="Case Color"
                onChange={e => dispatch(setKeyboardColor(keyboardColors[e.target.value].background))}
                defaultValue="gray"
              >
                {keyboardColors.map((color, index) => {
                  return (
                    <option value={index} key={color.color}>{color.caption}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div
          className={styles.keyboard}
          style={keyboardStyle}
        >
          {keyObject}
        </div>
      </div>
    </div>
  );
}

// <div className={styles.row} style={{display:"none"}}>
//   <textarea
//     className={styles.textarea}
//     aria-label="Set increment amount"
//     onChange={e => setKleValue(e.target.value)}
//     defaultValue={keyPresets.olivia_sf}
//   />
// </div>
// <div className={styles.row} style={{display:"none"}}>
//   <button
//     className={styles.button}
//     onClick={() =>
//       dispatch(parseKLE(kleValue))
//     }
//     aria-label="Input KLE raw data"
//   >
//     Set Layout
//   </button>
// </div>
