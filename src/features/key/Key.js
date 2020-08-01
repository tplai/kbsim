import React from 'react'
import PropTypes from 'prop-types'
import styles from './Key.module.css';

// keysize must be divisble by 9
const keysize = 54;
let keycodes = { 8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"leftarrow",38:"uparrow",39:"rightarrow",40:"downarrow",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"leftwinkey",92:"rightwinkey",93:"select",96:"numpad0",97:"numpad1",98:"numpad2",99:"numpad3",100:"numpad4",101:"numpad5",102:"numpad6",103:"numpad7",104:"numpad8",105:"numpad9",106:"multiply",107:"add",109:"subtract",110:"decimal",111:"divide",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock",186:"semicolon",187:"equalsign",188:"comma",189:"dash",190:"period",191:"forwardslash",192:"graveaccent",219:"openbracket",220:"backslash",221:"closebracket",222: "singlequote"
};

var keys={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pause:19,capslock:20,esc:27,space:32,pgp:33,pgdn:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,lwinkey:91,rwinkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};



// function for lightening/darkening keycap tops
function shadeColor(color, amt) {
  if (color.charAt(0) === "#") {
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
        backgroundColor: shadeColor(keycolor, 10),
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
