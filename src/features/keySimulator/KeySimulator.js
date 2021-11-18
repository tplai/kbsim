import React, { useState, useEffect, useRef, Suspense } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';
import {
  parseKLE,
  keyDown,
  keyUp,
  setKeyboardColor,
  selectLayout,
  selectLocations,
  selectPressedKeys,
  selectKeyboardStyle,
} from './keySimulatorSlice';
import { keySounds } from './../audioModules/audioModule.js';
import { keynames } from './../keyModules/keycodeMaps.js';
import { keyPresets } from './../keyModules/keyPresets.js'
import { keyboardColors } from './../keyModules/keyboardColors.js'
import { keyCodeOf } from './../keyModules/parseModules.js'
import { ToastContainer, toast } from './../toast/toast.js';
import Key from './../key/Key.js';
import store from '../store/store';
import styles from './KeySimulator.module.css';
const TypingTest = React.lazy(() => import('./../typingTest/TypingTest'));

// initially render a keyboard
store.dispatch(parseKLE(keyPresets[0].kle));
// store.dispatch(parseKLE(keyPresets[Math.floor(Math.random() * (keyPresets.length + 1))].kle));
// intially render the keyboard color
store.dispatch(setKeyboardColor(keyboardColors[0].background));

function KeySimulator({ currentTheme, theme }) {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);
  // x y indices of legends
  const keyLocations = useSelector(selectLocations);
  // pressed keys
  const pressedKeys = useSelector(selectPressedKeys);
  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);

  const dispatch = useDispatch();

  const keycontainer = useRef();
  const switchselect = useRef();
  const layoutselect = useRef();
  const caseselect = useRef();
  const [muted, setMute] = useState(false);
  const [kleValue, setKleValue] = useState();
  // set intial switch to first keysound
  const [switchValue, setSwitchValue] = useState("0");

  // subscriber to switch value. When switchvalue changes, execute this function
  useEffect(() => {
    // preload the sounds
    for (let sound in keySounds[switchValue].press) {
      new Howl({ src: keySounds[switchValue].press[sound], volume: 0 }).play();
    }
    for (let sound in keySounds[switchValue].release) {
      new Howl({ src: keySounds[switchValue].release[sound], volume: 0 }).play();
    }
  }, [switchValue]);

  // useEffect (() => {}, []);

  const handleSwitchChange = (e) => {
    setSwitchValue(e.target.value)
    switchselect.current.blur();
    keycontainer.current.focus();
    toast.show(`Switch sound changed to ${keySounds[e.target.value].caption} ✔️`, {
      timeout: 3000,
      pause: false,
      delay: 0,
      position: 'bottom-center',
      variant: currentTheme == "light" ? '' : 'default'
    });
  }

  const handleLayoutChange = (e) => {
    dispatch(parseKLE(keyPresets[e.target.value].kle));
    layoutselect.current.blur();
    keycontainer.current.focus();
  }

  const handleCaseChange = (e) => {
    dispatch(setKeyboardColor(keyboardColors[e.target.value].background))
    caseselect.current.blur();
    keycontainer.current.focus();
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
    // get the array X Y coordinates
    for (let coords in keyLocations[keynames[e.keyCode]]) {
      let action = {
        x: keyLocations[keynames[e.keyCode]][coords][0],
        y: keyLocations[keynames[e.keyCode]][coords][1],
        keycode: e.keyCode,
      };
      dispatch(keyDown(action));
    }
    // if not muted, valid key on keyboard, not pressed already, and selected switch has sounds
    if (!muted && keyLocations[keynames[e.keyCode]] && !pressedKeys.includes(e.keyCode) && keySounds[switchValue]) {
      // if the key is a special key (i.e. backspace, space, enter, etc) play a sound
      if (keynames[e.keyCode] in keySounds[switchValue].press) {
        new Howl({ src: keySounds[switchValue].press[keynames[e.keyCode]] }).play();
      }
      // generic key, get the row it's in and play the pitch-adjusted sound
      else {
        switch (parseInt(keyLocations[keynames[e.keyCode]][0][0])) {
          case 0:
            new Howl({ src: [keySounds[switchValue].press.GENERICR0] }).play();
            break;
          case 1:
            new Howl({ src: keySounds[switchValue].press.GENERICR1 }).play();
            break;
          case 2:
            new Howl({ src: keySounds[switchValue].press.GENERICR2 }).play();
            break;
          case 3:
            new Howl({ src: keySounds[switchValue].press.GENERICR3 }).play();
            break;
          case 4:
            new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play();
            break;
          default:
            new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play();
            break;
        }
      }
    }
  }

  // send an action to the reducer to release the key, then play a sound
  const handleKeyUp = (e) => {
    for (let coords in keyLocations[keynames[e.keyCode]]) {
      let action = {
        x: keyLocations[keynames[e.keyCode]][coords][0],
        y: keyLocations[keynames[e.keyCode]][coords][1],
        keycode: e.keyCode,
      };
      dispatch(keyUp(action));
    }
    // if a valid switch is selected
    if (!muted && keyLocations[keynames[e.keyCode]] && keySounds[switchValue]) {
      if (keynames[e.keyCode] in keySounds[switchValue].press) {
        new Howl({ src: keySounds[switchValue].release[keynames[e.keyCode]] }).play();
      }
      else {
        new Howl({ src: keySounds[switchValue].release.GENERIC }).play();
      }
    }
  }

  // called when an individual key detects a mousedown event
  const handleKeyMouseDown = (primaryLegend) => {
    // console.log(keyCodeOf(primaryLegend) + " " + x + " " + y);
    // get the array X Y coordinates
    for (let coords in keyLocations[primaryLegend]) {
      let action = {
        x: keyLocations[primaryLegend][coords][0],
        y: keyLocations[primaryLegend][coords][1],
        keycode: keyCodeOf(primaryLegend),
      };
      dispatch(keyDown(action));
    }
    // if not muted, valid key on keyboard, not pressed already, and selected switch has sounds
    if (!muted && keyLocations[primaryLegend] && !pressedKeys.includes(keyCodeOf(primaryLegend)) && keySounds[switchValue]) {
      // if the key is a special key (i.e. backspace, space, enter, etc) play a sound
      if (primaryLegend in keySounds[switchValue].press) {
        new Howl({ src: keySounds[switchValue].press[primaryLegend] }).play();
      }
      // generic key, get the row it's in and play the pitch-adjusted sound
      else {
        switch (parseInt(keyLocations[primaryLegend][0][0])) {
          case 0:
            new Howl({ src: [keySounds[switchValue].press.GENERICR0] }).play();
            break;
          case 1:
            new Howl({ src: keySounds[switchValue].press.GENERICR1 }).play();
            break;
          case 2:
            new Howl({ src: keySounds[switchValue].press.GENERICR2 }).play();
            break;
          case 3:
            new Howl({ src: keySounds[switchValue].press.GENERICR3 }).play();
            break;
          case 4:
            new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play();
            break;
          default:
            new Howl({ src: keySounds[switchValue].press.GENERICR4 }).play();
            break;
        }
      }
    }
  }

  // called when an individual key detects a mouseup event
  const handleKeyMouseUp = (primaryLegend) => {
    for (let coords in keyLocations[primaryLegend]) {
      let action = {
        x: keyLocations[primaryLegend][coords][0],
        y: keyLocations[primaryLegend][coords][1],
        keycode: keyCodeOf(primaryLegend),
      };
      dispatch(keyUp(action));
    }
    // if a valid switch is selected
    if (!muted && keyLocations[primaryLegend] && keySounds[switchValue]) {
      if (primaryLegend in keySounds[switchValue].press) {
        new Howl({ src: keySounds[switchValue].release[primaryLegend] }).play();
      }
      else {
        new Howl({ src: keySounds[switchValue].release.GENERIC }).play();
      }
    }
  }


  return (
    <div 
      className={styles.keywrapper}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={keycontainer}
      tabIndex="0"
      style={{
        backgroundColor: theme.background
      }}
    >
      <div className={styles.keycontainer}>
        <Suspense fallback={
          <div 
            className={styles.typingplaceholder}
            style={{
              borderColor: theme.boxBorder
            }}
          />
        }>
          <TypingTest />
        </Suspense>
        <div 
          className={styles.selectcontainer}
          style={{
            borderColor: theme.boxBorder
          }}
        >
          <div className={styles.selectarea}>
            <div className={styles.selectcol}>
              <select
                className={`${styles.dropdown} ${currentTheme == "light" ? styles.light : styles.dark}`}
                ref={switchselect}
                aria-label="Switch Type"
                onChange={handleSwitchChange}
                defaultValue="0"
                style={{
                  backgroundColor: theme.background,
                  color: theme.dropText,
                }}
              >
                {keySounds.map((sound, index) => {
                  return (<option value={index} key={sound.key}>{sound.caption}</option>);
                })}
              </select>
            </div>

            <div className={styles.selectcol}>
              <select
                className={`${styles.dropdown} ${currentTheme == "light" ? styles.light : styles.dark}`}
                ref={layoutselect}
                aria-label="Keyboard Layout"
                onChange={handleLayoutChange}
                defaultValue="0"
                style={{
                  backgroundColor: theme.background,
                  color: theme.dropText
                }}
              >
                {keyPresets.map((preset, index) => {
                  return (<option value={index} key={preset.key}>{preset.caption}</option>);
                })}
              </select>
            </div>
            <div className={styles.selectcol}>
              <select
                className={`${styles.dropdown} ${currentTheme == "light" ? styles.light : styles.dark}`}
                ref={caseselect}
                aria-label="Case Color"
                onChange={handleCaseChange}
                defaultValue="gray"
                style={{
                  backgroundColor: theme.background,
                  color: theme.dropText
                }}
              >
                {keyboardColors.map((color, index) => {
                  return (<option value={index} key={color.color}>{color.caption}</option>);
                })}
              </select>
            </div>
            <div 
              className={styles.mutecol}
              style={{
                color: theme.text
              }}
            >
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
            return (<div className={styles.keyrow} key={index}>
              {
                row.map((key) => {
                  return (
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
                      mouseDown={handleKeyMouseDown}
                      mouseUp={handleKeyMouseUp}
                    />
                  )
                })
              }
            </div>)
          })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      currentTheme: state.themeProvider.current,
      theme: state.themeProvider.theme
  }
}

export default connect(mapStateToProps)(KeySimulator);
