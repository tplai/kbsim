import React from 'react'
import logosvg from './../../assets/images/logo.svg'
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.headerContainer}>
    <div className={styles.logo}>
      <img src={logosvg} className={styles.logosvg} height="32" width="32"/> kbsim
    </div>
  </div>
)

export default Header
