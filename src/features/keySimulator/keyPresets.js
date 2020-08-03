let keyPresets = {
  white_dawn: "",
   // `["Esc",{x:0.5},"F1","F2","F3","F4",{x:0.5},"F5","F6","F7","F8",{x:0.5},"F9","F10","F11","F12",{x:0.5},"Delete"],\n[{y:0.25},"~\\n\\`","!\\n1","@\\n2","#\\n3","$\\n4","%\\n5","^\\n6","&\\n7","*\\n8","(\\n9",")\\n0","_\\n-","+\\n=",{w:2},"Backspace","End"],\n[{w:1.5},"Tab","Q","W","E","R","T","Y","U","I","O","P","{\\n[","}\\n]",{w:1.5},"|\\n\\","PgUp"],\n[{w:1.75},"Caps Lock","A","S","D","F","G","H","J","K","L",":\\n;","\"\\n'",{w:2.25},"Enter","PgDn"],\n[{w:2.25},"Shift","Z","X","C","V","B","N","M","<\\n,",">\\n.","?\\n/",{w:1.75},"Shift","↑","Fn"],\n[{w:1.5},"Ctrl",{x:0.75,w:1.5},"Alt",{a:7,w:7},"",{a:4,w:1.5},"Win",{x:0.75},"←","↓","→"]`
};

// for (let key in keyPresets) {
//   while (keyPresets[key].indexOf("fk") > -1) {
//     keyPresets[key].replace("fk", "\\n");
//   }
// }

export { keyPresets };
