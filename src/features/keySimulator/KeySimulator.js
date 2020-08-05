import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  parseKLE,
  keyDown,
  keyUp,
  selectLayout,
  selectLocations,
  selectKeyboardStyle,
} from './keySimulatorSlice';
import { keynames } from './../keyModules/keycodeMaps.js';
import { keySounds } from './../audioModules/audioModule.js';
import { keyPresets } from './../keyModules/keyPresets.js'
import { TypingTest } from './../typingTest/TypingTest.js';
import Key from './../key/Key.js';
import store from './../../app/store';
import styles from './KeySimulator.module.css';

// audio imports
// improvement area: dynamic imports, programmatic pitch shifting with .wav instead

// initial rendering
store.dispatch(parseKLE(keyPresets.olivia_sf));

export function KeySimulator() {
  // Layout array of keyboard
  const layout = useSelector(selectLayout);
  // x y indices of legends
  const keyLocations = useSelector(selectLocations);
  // dimensions of keyboard and border
  const keyboardStyle = useSelector(selectKeyboardStyle);
  // const mousepadStyle = useSelector(selectMousepadStyle);

  // highlight for indicating if KLE was formatted correctly
  // const highlight = useSelector(selectHighlight);
  const dispatch = useDispatch();

  const [kleValue, setKleValue] = useState();
  const [switchValue, setSwitchValue] = useState("holypanda");
  // const [inputValue, setInputValue] = useState()
  // const [highlightType, setHighlight] = useState();

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
    let coordArray = tree.keySimulator.keyLocations[keynames[e.keyCode]]
    for (let coords in coordArray) {
      let action = {
        x: coordArray[coords][0],
        y: coordArray[coords][1],
      };
      dispatch(keyDown(action));
    }
    // if the key is not pressed and valid switch is selected
    if (!tree.keySimulator.pressedKeys.includes(keynames[e.keyCode]) && switchValue in keySounds) {
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
            <select
              className={styles.dropdown}
              aria-label="Switch Type"
              onChange={e => setSwitchValue(e.target.value)}
              defaultValue="holypanda"
            >
              <option value="holypanda">Holy Pandas</option>
              <option value="blackink">Gateron Black Inks</option>
              <option value="redink">Gateron Red Inks</option>
              <option value="cream">NK Creams</option>
              <option value="mxblack">Cherry MX Blacks</option>
              <option value="boxnavy">Box Navies</option>
              <option value="buckling">Buckling Spring</option>
              <option value="bluealps">Blue Alps</option>
              <option value="topre">Topres</option>
            </select>
            <select
              className={styles.dropdown}
              aria-label="Keyboard Layout"
              onChange={e => dispatch(parseKLE(keyPresets[e.target.value]))}
              defaultValue="olivia_sf"
            >
              <option value="olivia_sf">GMK Olivia WKL 75%</option>
              <option value="modo_wkltkl">GMK Modo WKL TKL</option>
              <option value="dracula_tkl">GMK Dracula TKL</option>
              <option value="mizu_fullsize">GMK Mizu Full Size</option>
              <option value="bow_fullsize">GMK BoW Full Size</option>
              <option value="ezze_sxf">GMK 8008 WKL 65%</option>
              <option value="modelm">Model M</option>
              <option value="hhkb">HHKB</option>
              <option value="white_sf">GMK BoW 75%</option>
            </select>
            <select
              className={styles.dropdown}
              aria-label="Case Color"
              defaultValue="gray"
            >
              <option value="gray">Gray</option>
              <option value="black">Black</option>
              <option value="silver">Silver</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>
        <div
          className={styles.keyboard}
          style={keyboardStyle}
        >
          {keyObject}
        </div>
      </div>
      <div className={styles.row} style={{display:"none"}}>
        <textarea
          className={styles.textarea}
          aria-label="Set increment amount"
          onChange={e => setKleValue(e.target.value)}
          defaultValue={keyPresets.olivia_sf}
        />
      </div>
      <div className={styles.row} style={{display:"none"}}>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(parseKLE(kleValue))
          }
          aria-label="Input KLE raw data"
        >
          Set Layout
        </button>
      </div>
    </div>
  );
}
