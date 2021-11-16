import React from 'react'
import logosvg from './../../assets/images/logo.svg'
import { BsMoonStarsFill as Moon, BsFillBrightnessAltHighFill as Sun } from "react-icons/bs"
import { toggleTheme } from '../themeProvider/themeProviderSlice';
import { connect } from 'react-redux';
import styles from './Header.module.css';

function Header({ theme, toggle }) {  
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={logosvg} className={styles.logosvg} height="32" width="32"/> kbsim
        </div>
        <div className={styles.subnav} onClick={toggle}>
        {theme === "light" ? <Moon className={styles.lightswitch}/> : <Sun className={styles.lightswitch}/>}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      theme: state.themeProvider.theme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: () => dispatch(toggleTheme())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
