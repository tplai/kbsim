import keySpacePress from './../../audio/buckling/press/SPACE.mp3';
import keySpaceRelease from './../../audio/buckling/release/SPACE.mp3';
import keyEnterPress from './../../audio/buckling/press/ENTER.mp3';
import keyEnterRelease from './../../audio/buckling/release/ENTER.mp3';
import keyBackspacePress from './../../audio/buckling/press/BACKSPACE.mp3';
import keyBackspaceRelease from './../../audio/buckling/release/BACKSPACE.mp3';
import keyGenericPressR0 from './../../audio/buckling/press/GENERIC_R0.mp3';
import keyGenericPressR1 from './../../audio/buckling/press/GENERIC_R1.mp3';
import keyGenericPressR2 from './../../audio/buckling/press/GENERIC_R2.mp3';
import keyGenericPressR3 from './../../audio/buckling/press/GENERIC_R3.mp3';
import keyGenericPressR4 from './../../audio/buckling/press/GENERIC_R4.mp3';
import keyGenericRelease from './../../audio/buckling/release/GENERIC.mp3';

export const buckling = {
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
