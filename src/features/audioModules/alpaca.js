import keySpacePress from './../../assets/audio/alpaca/press/SPACE.mp3';
import keySpaceRelease from './../../assets/audio/alpaca/release/SPACE.mp3';
import keyEnterPress from './../../assets/audio/alpaca/press/ENTER.mp3';
import keyEnterRelease from './../../assets/audio/alpaca/release/ENTER.mp3';
import keyBackspacePress from './../../assets/audio/alpaca/press/BACKSPACE.mp3';
import keyBackspaceRelease from './../../assets/audio/alpaca/release/BACKSPACE.mp3';
import keyGenericPressR0 from './../../assets/audio/alpaca/press/GENERIC_R0.mp3';
import keyGenericPressR1 from './../../assets/audio/alpaca/press/GENERIC_R1.mp3';
import keyGenericPressR2 from './../../assets/audio/alpaca/press/GENERIC_R2.mp3';
import keyGenericPressR3 from './../../assets/audio/alpaca/press/GENERIC_R3.mp3';
import keyGenericPressR4 from './../../assets/audio/alpaca/press/GENERIC_R4.mp3';
import keyGenericRelease from './../../assets/audio/alpaca/release/GENERIC.mp3';

export const alpaca = {
  key: "alpaca",
  caption: "Alpacas",
  press: {
    SPACE: keySpacePress,
    ENTER: keyEnterPress,
    BACKSPACE: keyBackspacePress,
    GENERICR0: keyGenericPressR0,
    GENERICR1: keyGenericPressR1,
    GENERICR2: keyGenericPressR2,
    GENERICR3: keyGenericPressR3,
    GENERICR4: keyGenericPressR4,
  },
  release: {
    SPACE: keySpaceRelease,
    ENTER: keyEnterRelease,
    BACKSPACE: keyBackspaceRelease,
    GENERIC: keyGenericRelease,
  },
}


// let alpaca = {
//   key: "alpaca",
//   caption: "Alpacas",
//   press: {
//     SPACE: null,
//     ENTER: null,
//     BACKSPACE: null,
//     GENERICR0: null,
//     GENERICR1: null,
//     GENERICR2: null,
//     GENERICR3: null,
//     GENERICR4: null,
//   },
//   release: {
//     SPACE: null,
//     ENTER: null,
//     BACKSPACE: null,
//     GENERIC: null,
//   },
// }
//
// import('./../../assets/audio/alpaca/press/SPACE.mp3').then(keySpacePress => {alpaca.press.SPACE = keySpacePress});
// import('./../../assets/audio/alpaca/release/SPACE.mp3').then(keySpaceRelease => {alpaca.release.SPACE = keySpaceRelease});
// import('./../../assets/audio/alpaca/press/ENTER.mp3').then(keyEnterPress => {alpaca.press.ENTER = keyEnterPress});
// import('./../../assets/audio/alpaca/release/ENTER.mp3').then(keyEnterRelease => {alpaca.release.ENTER = keyEnterRelease});
// import('./../../assets/audio/alpaca/press/BACKSPACE.mp3').then(keyBackspacePress => {alpaca.press.BACKSPACE = keyBackspacePress});
// import('./../../assets/audio/alpaca/release/BACKSPACE.mp3').then(keyBackspaceRelease => {alpaca.release.BACKSPACE = keyBackspaceRelease});
// import('./../../assets/audio/alpaca/press/GENERIC_R0.mp3').then(keyGenericPressR0 => {alpaca.press.GENERICR0 = keyGenericPressR0});
// import('./../../assets/audio/alpaca/press/GENERIC_R1.mp3').then(keyGenericPressR1 => {alpaca.press.GENERICR1 = keyGenericPressR1});
// import('./../../assets/audio/alpaca/press/GENERIC_R2.mp3').then(keyGenericPressR2 => {alpaca.press.GENERICR2 = keyGenericPressR2});
// import('./../../assets/audio/alpaca/press/GENERIC_R3.mp3').then(keyGenericPressR3 => {alpaca.press.GENERICR3 = keyGenericPressR3});
// import('./../../assets/audio/alpaca/press/GENERIC_R4.mp3').then(keyGenericPressR4 => {alpaca.press.GENERICR4 = keyGenericPressR4});
// import('./../../assets/audio/alpaca/release/GENERIC.mp3').then(keyGenericRelease => {alpaca.release.GENERIC = keyGenericRelease});
//
// export { alpaca }
