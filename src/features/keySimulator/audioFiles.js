// file
import keySpacePress from './../../audio/holypanda/press/SPACE.mp3';
import keySpaceRelease from './../../audio/holypanda/release/SPACE.mp3';
import keyCtrlPress from './../../audio/holypanda/press/CTRL.mp3';
import keyCtrlRelease from './../../audio/holypanda/release/CTRL.mp3';
import keyGenericPress from './../../audio/holypanda/press/GENERIC.mp3';
import keyGenericRelease from './../../audio/holypanda/release/GENERIC.mp3';

let audiofolder = "./../../audiofolder";
let switchfolder = "/holypanda";
let switches = ["SPACE", "CTRL", "GENERIC"];
let keySounds = {
  press: {},
  release: {},
}

for (let item in switches) {
  import pressSound from `${audiofolder}/${switchfolder}/press/${switches[item]}.mp3`;
  keySounds.press[switches[item]] = pressSound;

  import releaseSound from `${audiofolder}/${switchfolder}/release/${switches[item]}.mp3`;
  keySounds.release[switches[item]] = pressSound;
}

export keySounds;
