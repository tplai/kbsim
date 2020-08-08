import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Howl, Howler } from 'howler';
import {
  parseKLE,
  keyDown,
  keyUp,
  setKeyboardColor,
  selectLayout,
  selectLocations,
  selectKeyboardStyle,
} from './keySimulatorSlice';
import { keySounds } from './../audioModules/audioModule.js';
import { keynames } from './../keyModules/keycodeMaps.js';
import { keyPresets } from './../keyModules/keyPresets.js'
import { keyboardColors } from './../keyModules/keyboardColors.js'
import { ToastContainer, toast } from './../toast/toast.js';
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

  const [muted, setMute] = useState(false);
  const [kleValue, setKleValue] = useState();
  // set intial switch to first keysound
  const [switchValue, setSwitchValue] = useState("0");

  // subscriber to switch value. When switchvalue changes, execute this function
  useEffect(() => {
    // preload the sounds
    for (let sound in keySounds[switchValue].press) {
      new Howl({src: keySounds[switchValue].press[sound], volume: 0}).play();
    }
    for (let sound in keySounds[switchValue].release) {
      new Howl({src: keySounds[switchValue].release[sound], volume: 0}).play();
    }
  }, [switchValue]);

  const handleSwitchChange = (e) => {
    setSwitchValue(e.target.value)
    toast.show( `Switch sound changed to ${keySounds[e.target.value].caption} ✔️`, { timeout: 3000, pause: false, delay: 0, position: 'bottom-center' });
  }

  const toggleMute = () => {
    // mute ? setMute(false) : setMute(true);
    setMute(!muted);
  }

  // send an action to the reducer to highlight the corresponding key, then play a sound
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
      if (!muted && coordArray && !tree.keySimulator.pressedKeys.includes(e.keyCode) && keySounds[switchValue]) {
        // if the key is a special key (i.e. backspace, space, enter, etc) play a sound
        if (keynames[e.keyCode] in keySounds[switchValue].press) {
          new Howl({src: keySounds[switchValue].press[keynames[e.keyCode]]}).play();
        }
        // generic key, get the row it's in and play the pitch-adjusted sound
        else {
          if (coordArray) {
            switch(parseInt(coordArray[0][0])) {
              case 0:
              let sound = new Howl({src: [keySounds[switchValue].press.GENERICR0]});
              sound.play();
              // new Audio(keySounds[switchValue].press.GENERICR0).play();
              break;
              case 1:
              new Howl({src: keySounds[switchValue].press.GENERICR1}).play();
              break;
              case 2:
              new Howl({src: keySounds[switchValue].press.GENERICR2}).play();
              break;
              case 3:
              new Howl({src: keySounds[switchValue].press.GENERICR3}).play();
              break;
              case 4:
              new Howl({src: keySounds[switchValue].press.GENERICR4}).play();
              break;
              default:
              new Howl({src: keySounds[switchValue].press.GENERICR4}).play();
              break;
            }
          }
          // key not found
          else {
            new Howl({src: keySounds[switchValue].press.GENERICR4}).play();
          }
        }
      }
    }

  // send an action to the reducer to release the key, then play a sound
  const handleKeyUp = (e) => {
    let tree = store.getState();
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]]
    for (let coords in tree.keySimulator.keyLocations[keynames[e.keyCode]]) {
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
        keycode: e.keyCode,
      };
      dispatch(keyUp(action));
    }
    // if a valid switch is selected
    if (!muted && keySounds[switchValue]) {
      if (keynames[e.keyCode] in keySounds[switchValue].press) {
        new Howl({src: keySounds[switchValue].release[keynames[e.keyCode]]}).play();
      }
      else {
        new Howl({src: keySounds[switchValue].release.GENERIC}).play();
      }
    }
  }

  return (
    <div>
      <div
        className={styles.keycontainer}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex="0"
      >
        <TypingTest/>

        <div className={styles.selectcontainer}>
          <div className={styles.selectarea}>
            <div className={styles.selectcol}>
              <select
                className={styles.dropdown}
                aria-label="Switch Type"
                onChange={handleSwitchChange}
                defaultValue="0"
              >
                {keySounds.map((sound, index) => {
                    return (<option value={index} key={sound.key}>{sound.caption}</option>);
                })}
              </select>
            </div>

            <div className={styles.selectcol}>
              <select
                className={styles.dropdown}
                aria-label="Keyboard Layout"
                onChange={e => dispatch(parseKLE(keyPresets[e.target.value].kle))}
                defaultValue="0"
              >
                {keyPresets.map((preset, index) => {
                    return (<option value={index} key={preset.key}>{preset.caption}</option>);
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
                  return (<option value={index} key={color.color}>{color.caption}</option>);
                })}
              </select>
            </div>
            <div className={styles.mutecol}>
              <label className={styles.mutebox}>
                <input
                  type="checkbox"
                  onChange={e => toggleMute()}
                  aria-label="Mute Sound"
                />
                <span className={styles.checkMark}></span>
                Mute
              </label>
            </div>
          </div>
        </div>
        <div
          className={styles.keyboard}
          style={keyboardStyle}
        >
          {layout.map((row, index) => {
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
            })}
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
}
