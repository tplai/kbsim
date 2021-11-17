import React from 'react'
import logosvg from './../../assets/images/logo.svg'
import { BsMoonFill as Moon, BsFillBrightnessAltHighFill as Sun } from "react-icons/bs"
import { toggleTheme } from '../themeProvider/themeProviderSlice';
import { connect } from 'react-redux';
import styles from './Header.module.css';

function Header({ currentTheme, theme, toggle }) {  
  return (
    <div 
      className={styles.header}
      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={logosvg} className={styles.logosvg} alt="kbsim logo" height="32" width="32"/> kbsim
        </div>
        <div className={styles.subnav} onClick={toggle}>
        {currentTheme === "light" ? <Moon className={styles.lightswitch}/> : <Sun className={styles.lightswitch}/>}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      currentTheme: state.themeProvider.current,
      theme: state.themeProvider.theme,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggle: () => dispatch(toggleTheme())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
