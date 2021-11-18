import React from 'react';
import { connect } from 'react-redux';
import { palette } from '../theme/theme';
import store from '../store/store';
import styles from './ThemeProvider.module.css';

function ThemeProvider({ children, theme }) {
    document.body.style = `background: ${[palette[store.getState().themeProvider.current].background]};`;
    return (
        <div 
          className={styles.themeProvider}
          style={{
              backgroundColor: theme.background
          }}
        >
            {children}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.themeProvider.theme
    }
  }

export default connect(mapStateToProps)(ThemeProvider);
