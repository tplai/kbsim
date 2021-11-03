import React from 'react'
import github from './../../assets/images/github.svg'
// import { ReactComponent as GitHub} from './../../assets/images/github.svg'
import discord from './../../assets/images/discord.svg'
import styles from './Footer.module.css';

// <img src={github} height="15" width="15"/> GitHub
const Footer = () => (
  <div className={styles.footerContainer}>
    <a href="https://github.com/tplai/kbsim" target="_blank" className={styles.link}>
      <div className={styles.linkColor}>
        <img src={github} height="15" width="15"/> GitHub
      </div>
    </a>
    <a href="https://discord.gg/gSZXeydrQR" target="_blank" className={styles.link}>
      <div className={styles.linkColor}>
        <img src={discord} height="12" width="15"/> Discord
      </div>
    </a>
  </div>
)

export default Footer
